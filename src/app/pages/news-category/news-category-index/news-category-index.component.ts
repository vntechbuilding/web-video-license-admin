import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { Mixin } from 'ts-mixer';
import { ModalBase } from '../../../shared/base/modal-base';
import { NewsCategory, NewsCategoryService } from '../news-category.service';
import {
  NzTreeFlatDataSource,
  NzTreeFlattener,
  NzTreeViewModule,
} from 'ng-zorro-antd/tree-view';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Observable, startWith, Subject, switchMap, tap } from 'rxjs';
import { domain } from '../../domain/domain.service';
import { DomainCreateComponent } from '../../domain/domain-create/domain-create.component';
import { NewsCategoryCreateComponent } from '../news-category-create/news-category-create.component';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NewsCategoryEditComponent } from '../news-category-edit/news-category-edit.component';
import { pick } from 'lodash';
import { environment } from '../../../../environments/environment';
import {
  UserDomainFilter,
  UserDomainFilterComponent,
} from '../../../shared/component/user-domain-filter/user-domain-filter.component';
interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
// interface TreeNode {
//   name: string;
//   domain?: domain;
//   children?: TreeNode[];
// }
@Component({
  selector: 'app-news-category-index',
  standalone: true,
  imports: [
    NzTableModule,
    NzButtonModule,
    CommonModule,
    NzSwitchModule,
    FormsModule,
    NzIconDirective,
    NzTooltipDirective,
    NzTreeViewModule,
    NzPopconfirmModule,
    UserDomainFilterComponent,
  ],
  templateUrl: './news-category-index.component.html',
  styleUrl: './news-category-index.component.scss',
})
export class NewsCategoryIndexComponent extends Mixin(ModalBase) {
  public uploadMetaImageUrl = environment.uploadMetaImageThumbnailUrl;
  public uploadContentImageUrl = environment.uploadContentImageThumbnailUrl;
  constructor(private newsCategory: NewsCategoryService) {
    super();
  }
  loadDataSubject$ = new Subject<boolean>();

  category$ = this.loadDataSubject$
    .pipe(startWith(true))
    .pipe(
      switchMap(() => {
        if (this.filterData?.domainId) {
          return this.newsCategory.allDomainCategory(this.filterData.domainId);
        } else if (this.filterData?.userId) {
          return this.newsCategory.allUserCategory(this.filterData.userId);
        } else {
          return this.newsCategory.allCategories();
        }
      })
    )
    .pipe(
      tap((category) => {
        this.dataSource.setData(category);
        this.treeControl.expandAll();
      })
    );

  changeDisabled(data: NewsCategory, disabled: boolean) {
    this.newsCategory
      .updateCategory({
        ...pick(
          data,
          'domainId',
          'image',
          'metaDescription',
          'metaTitle',
          'parentId',
          'rootId',
          'summary',
          'title'
        ),
        disabled,
        categoryId: data.id,
      })
      .subscribe(() => this.loadDataSubject$.next(true));
  }

  private transformer = (node: NewsCategory, level: number): FlatNode => ({
    ...node,
    expandable: !!node.children && node.children.length > 0,
    name: node.title,
    level,
  });

  treeControl = new FlatTreeControl<FlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new NzTreeFlattener(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);

  showLeafIcon = false;

  hasChild = (_: number, node: FlatNode): boolean => node.expandable;

  // ngAfterViewInit(): void {
  //   this.treeControl.expandAll();
  // }

  // getNode(name: string): FlatNode | null {
  //   return this.treeControl.dataNodes.find((n) => n.name === name) || null;
  // }

  create() {
    const modal = this.createComponentModal(
      {
        nzTitle: 'Tạo danh mục',
        nzWidth: '100vw',
      },
      NewsCategoryCreateComponent
    );
    modal.afterClose.subscribe((data) => {
      if (data) this.loadDataSubject$.next(true);
    });
  }

  delete(newsCategory: NewsCategory) {
    return this.newsCategory
      .deleteNewsCategory(newsCategory.id)
      .subscribe(() => {
        this.loadDataSubject$.next(true);
      });
  }

  update(newsCategory: NewsCategory) {
    const modal = this.createComponentModal<
      NewsCategoryEditComponent,
      NewsCategory
    >(
      {
        nzTitle: 'Cập nhật danh mục ' + newsCategory.title,
        nzWidth: '100vw',
      },
      NewsCategoryEditComponent,
      newsCategory
    );
    modal.afterClose.subscribe(() => {
      this.loadDataSubject$.next(true);
    });
  }
  filterData!: UserDomainFilter;
  filter($event: UserDomainFilter) {
    this.filterData = $event;
    this.loadDataSubject$.next(true);
  }
}
