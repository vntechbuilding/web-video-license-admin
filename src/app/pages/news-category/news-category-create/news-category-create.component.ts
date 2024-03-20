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
  flattenCategories(categories: NewsCategory[], level = 0): NewsCategory[] {
    let flatCategories: NewsCategory[] = [];

    for (let category of categories) {
      // Tạo một bản sao của danh mục và thêm vào khoảng trắng ở đầu tên dựa trên cấp độ của nó
      let newCategory = {
        ...category,
        name: '--'.repeat(level * 2) + category.name,
      };
      flatCategories.push(newCategory);

      // Nếu danh mục này có mục con, duyệt qua chúng
      if (category.children) {
        let childCategories = this.flattenCategories(
          category.children,
          level + 1
        );
        flatCategories = flatCategories.concat(childCategories);
      }
    }

    return flatCategories;
  }
  userSub!: Subscription;
  domainSub!: Subscription;
  ngOnInit() {
    this.validateForm = this.fb.group({
      domainId: ['', [Validators.required]],
      userId: ['', [Validators.required]],
      description: ['', [Validators.required]],
      name: ['', [Validators.required]],
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
    description: {
      required: 'Mô tả không được để trống',
    },
    name: {
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
