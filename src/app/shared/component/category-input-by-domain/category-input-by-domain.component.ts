import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { InputComponentBase } from '../../base/input-component.base';
import { map, ReplaySubject, Subscription, switchMap } from 'rxjs';
import { NewsCategoryService } from '../../../pages/news-category/news-category.service';
import { FlattenCategories } from '../../utils/flatten-categories';

@Component({
  selector: 'app-category-input-by-domain',
  standalone: true,
  imports: [
    NzFormModule,
    NzSelectModule,
    NzGridModule,
    ReactiveFormsModule,
    NzInputModule,
    CommonModule,
  ],
  templateUrl: './category-input-by-domain.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CategoryInputByDomainComponent),
      multi: true,
    },
  ],
  styleUrl: './category-input-by-domain.component.scss',
})
export class CategoryInputByDomainComponent
  extends InputComponentBase
  implements OnInit, OnDestroy
{
  constructor(private newsCategoryService: NewsCategoryService) {
    super();
  }

  loadData$ = new ReplaySubject<string>();
  category$ = this.loadData$.pipe(
    switchMap((domainId) => {
      if (!domainId) return [];
      return this.newsCategoryService.allDomainCategory(domainId);
    }),
    map((listCategory) => this.flattenCategories(listCategory))
  );
  flattenCategories = FlattenCategories;
  @Output('categoryId') categoryId = new EventEmitter<string>();
  @Input('allowClear') allowClear: boolean = false;
  domainIdSubscription!: Subscription;
  categoryIdSubscription!: Subscription;
  ngOnInit() {
    this.addControl(
      'categoryId',
      this.validators['categoryId'],
      this.defaultValue['categoryId']
    );
    this.domainIdSubscription = this.formGroup
      .get('domainId')
      ?.valueChanges.subscribe((value) =>
        this.loadData$.next(value)
      ) as Subscription;
    this.categoryIdSubscription = this.formGroup
      .get('userId')
      ?.valueChanges.subscribe((value) => {
        this.categoryId.next(value);
      }) as Subscription;

    if (this.defaultValue['domainId']) {
      this.loadData$.next(this.defaultValue['domainId']);
    }
  }
  ngOnDestroy() {
    if (this.domainIdSubscription) this.domainIdSubscription.unsubscribe();
    if (this.categoryIdSubscription) this.categoryIdSubscription.unsubscribe();
  }
}
