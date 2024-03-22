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
import { Mixin } from 'ts-mixer';
import { FormBase } from '../../../shared/base/form-base';
import { ModalContentBase } from '../../../shared/base/modal-content-base';
import { UserService } from '../../user/user.service';
import { NewsCategory, NewsCategoryService } from '../news-category.service';
import { map, of, Subject, Subscription, switchMap } from 'rxjs';
import { DomainService } from '../../domain/domain.service';
import { NewsCategoryOptionComponent } from '../../../shared/component/news-category-option/news-category-option.component';
import { FlattenCategories } from '../../../shared/utils/flatten-categories';
import { HeadMetaInputComponent } from '../../../shared/component/head-meta-input/head-meta-input.component';
import { ContentImageInputComponent } from '../../../shared/component/content-image-input/content-image-input.component';

@Component({
  selector: 'app-news-category-create',
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
    ContentImageInputComponent,
  ],
  templateUrl: './news-category-create.component.html',
  styleUrl: './news-category-create.component.scss',
})
export class NewsCategoryCreateComponent
  extends Mixin(FormBase, ModalContentBase)
  implements OnInit, OnDestroy
{
  constructor(
    private user: UserService,
    private newsCategory: NewsCategoryService,
    private domain: DomainService
  ) {
    super();
  }
  user$ = this.user.getAllUser(1000);
  loadDomain$ = new Subject<string>();
  domain$ = this.loadDomain$.pipe(
    switchMap((userId) => {
      if (!userId) return of([]);
      return this.domain.allUserDomain(userId);
    })
  );

  loadCategory$ = new Subject<string>();
  category$ = this.loadCategory$.pipe(
    switchMap((domainId) => {
      if (!domainId) {
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
      domainId: ['', [Validators.required]],
      userId: ['', [Validators.required]],
      title: ['', [Validators.required]],
      parentId: [''],
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
        .createCategory(this.removeBlankString(this.validateForm.value) as any)
        .pipe(this.httpErrorOperator('domain'))
        .subscribe((data) => {
          this.destroyModal(data);
        });
    }
  }
}
