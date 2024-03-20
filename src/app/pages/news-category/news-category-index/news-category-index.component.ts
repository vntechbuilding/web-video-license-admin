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
  ],
  templateUrl: './news-category-index.component.html',
  styleUrl: './news-category-index.component.scss',
})
export class NewsCategoryIndexComponent extends Mixin(ModalBase) {
  constructor(private newsCategory: NewsCategoryService) {
    super();
  }
  loadDataSubject$ = new Subject<boolean>();

  category$ = this.loadDataSubject$
    .pipe(startWith(true))
    .pipe(switchMap(() => this.newsCategory.allCategories()))
    .pipe(
      tap((category) => {
        this.dataSource.setData(category);
        this.treeControl.expandAll();
      })
    );

  changeDisabled(data: NewsCategory, disabled: boolean) {}

  private transformer = (node: NewsCategory, level: number): FlatNode => ({
    ...node,
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
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
}