import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import {
  AbstractControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DisabledInputComponent } from '../../../shared/component/disabled-input/disabled-input.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { NewsCategoryOptionComponent } from '../../../shared/component/news-category-option/news-category-option.component';
import { Mixin } from 'ts-mixer';
import { FormBase } from '../../../shared/base/form-base';
import { ModalContentBase } from '../../../shared/base/modal-content-base';
import { UserService } from '../../user/user.service';
import { NewsCategory, NewsCategoryService } from '../news-category.service';
import { DomainService } from '../../domain/domain.service';
import { map, of, Subject, Subscription, switchMap, tap } from 'rxjs';
import { FlattenCategories } from '../../../shared/utils/flatten-categories';
import { HeadMetaInputComponent } from '../../../shared/component/head-meta-input/head-meta-input.component';
import { FullnameInputComponent } from '../../../shared/component/fullname-input/fullname-input.component';
import { PhoneEmailInputComponent } from '../../../shared/component/phone-email-input/phone-email-input.component';
import { ContentImageInputComponent } from '../../../shared/component/content-image-input/content-image-input.component';

@Component({
  selector: 'app-news-category-edit',
  standalone: true,
  imports: [
    NzFormModule,
    NzGridModule,
    NzButtonModule,
    NzInputModule,
    ReactiveFormsModule,
    DisabledInputComponent,
    NzSelectModule,
    CommonModule,
    NewsCategoryOptionComponent,
    HeadMetaInputComponent,
    FullnameInputComponent,
    PhoneEmailInputComponent,
    ContentImageInputComponent,
  ],
  templateUrl: './news-category-edit.component.html',
  styleUrl: './news-category-edit.component.scss',
})
export class NewsCategoryEditComponent
  extends Mixin(FormBase, ModalContentBase<NewsCategory>)
  implements OnInit, OnDestroy
{
  constructor(
    private user: UserService,
    private newsCategory: NewsCategoryService,
    private domain: DomainService
  ) {
    super();
  }
  user$ = this.user
    .getAllUser(1000)
    .pipe(
      tap(() => this.loadDomain$.next(this.nzModalData.domain?.userId || ''))
    );
  loadDomain$ = new Subject<string>();
  domain$ = this.loadDomain$
    .pipe(
      switchMap((userId) => {
        if (!userId) {
          this.validateForm.get('domainId')?.setValue('');
          return of([]);
        }
        return this.domain.allUserDomain(userId);
      })
    )
    .pipe(tap(() => this.loadCategory$.next(this.nzModalData.domainId || '')));

  loadCategory$ = new Subject<string>();
  category$ = this.loadCategory$.pipe(
    switchMap((domainId) => {
      if (!domainId) {
        this.validateForm.get('parentId')?.setValue('');
        return of([]);
      } else
        return this.newsCategory
          .allDomainCategory(domainId)
          .pipe(map((listCategory) => this.flattenCategories(listCategory)));
    })
  );
  flattenCategories = FlattenCategories;
  userSub!: Subscription;
  domainSub!: Subscription;
  ngOnInit() {
    this.validateForm = this.fb.group({
      domainId: [this.nzModalData.domainId, [Validators.required]],
      userId: [this.nzModalData.domain?.userId, [Validators.required]],
      title: [this.nzModalData.title, [Validators.required]],
      parentId: [this.nzModalData.parentId],
    });
    this.domainSub = (
      this.validateForm.get('domainId') as AbstractControl
    ).valueChanges.subscribe((domainId: string) =>
      this.loadCategory$.next(domainId)
    );
    this.userSub = (
      this.validateForm.get('userId') as AbstractControl
    )?.valueChanges.subscribe((userId: string) =>
      this.loadDomain$.next(userId)
    );
  }
  override ngOnDestroy() {
    if (this.domainSub) this.domainSub.unsubscribe();

    if (this.userSub) this.userSub.unsubscribe();
  }

  override _formErrorMsg = {
    domain: {
      required: 'Domain không được để trống',
    },
    userId: {
      required: 'User không được để trống',
    },
    title: {
      required: 'Tiêu đề không được để trống',
    },
  };

  submitForm() {
    if (this.formValid()) {
      this.newsCategory
        .updateCategory(
          this.removeBlankString({
            ...this.validateForm.value,
            categoryId: this.nzModalData.id,
          }) as any
        )
        .pipe(this.httpErrorOperator('domain'))
        .subscribe((data) => {
          this.destroyModal(data);
        });
    }
  }
}
