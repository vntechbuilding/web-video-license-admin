import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { FormBase } from '../../base/form-base';
import { UserService } from '../../../pages/user/user.service';
import { DomainService } from '../../../pages/domain/domain.service';
import {
  debounceTime,
  map,
  of,
  ReplaySubject,
  Subscription,
  switchMap,
} from 'rxjs';
import { NewsCategoryService } from '../../../pages/news-category/news-category.service';
import { FlattenCategories } from '../../utils/flatten-categories';
export declare type UserDomainNewsCategoryFilter = {
  userId: string;
  domainId: string;
  categoryId: string;
};
@Component({
  selector: 'app-user-domain-news-category-filter',
  standalone: true,
  imports: [
    NzFormModule,
    NzGridModule,
    NzInputModule,
    ReactiveFormsModule,
    NzSelectModule,
    CommonModule,
  ],
  templateUrl: './user-domain-news-category-filter.component.html',
  styleUrl: './user-domain-news-category-filter.component.scss',
})
export class UserDomainNewsCategoryFilterComponent
  extends FormBase
  implements OnInit, OnDestroy
{
  @Output() filter = new EventEmitter<UserDomainNewsCategoryFilter>();
  constructor(
    private user: UserService,
    private domain: DomainService,
    private newsCategory: NewsCategoryService
  ) {
    super();
  }
  user$ = this.user.getAllUser(1000);
  loadDomain$ = new ReplaySubject<string>();
  domain$ = this.loadDomain$.pipe(
    switchMap((userId) => {
      this.validateForm.get('domainId')?.setValue('');
      if (!userId) {
        return of([]);
      }
      return this.domain.allUserDomain(userId);
    })
  );
  loadNewsCategory$ = new ReplaySubject<string>();
  newsCategory$ = this.loadNewsCategory$.pipe(
    switchMap((domainId) => {
      this.validateForm.get('categoryId')?.setValue('');
      if (!domainId) {
        return of([]);
      }
      return this.newsCategory.allDomainCategory(domainId);
    }),
    map((listCategory) => this.flattenCategories(listCategory))
  );
  flattenCategories = FlattenCategories;

  valueSubscription!: Subscription;
  ngOnInit() {
    this.validateForm = this.fb.group({
      domainId: [''],
      userId: [''],
      categoryId: [''],
    });
    let lastValue: UserDomainNewsCategoryFilter;
    this.valueSubscription = this.validateForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        if (JSON.stringify(value) === JSON.stringify(lastValue)) return;
        if (!lastValue || lastValue.userId !== value.userId) {
          this.loadDomain$.next(value.userId);
        }
        if (!lastValue || lastValue.domainId !== value.domainId) {
          this.loadNewsCategory$.next(value.domainId);
        }
        lastValue = value;
        this.filter.next(value);
      });

    if (this.defaultValue['userId']) {
      this.loadDomain$.next(this.defaultValue['userId']);
    }

    if (this.defaultValue['domainId']) {
      this.loadNewsCategory$.next(this.defaultValue['domainId']);
    }
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    if (this.valueSubscription) this.valueSubscription.unsubscribe();
  }
}
