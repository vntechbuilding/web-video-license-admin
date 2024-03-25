import { Component } from '@angular/core';
import {
  UserDomainFilter,
  UserDomainFilterComponent,
} from '../../../shared/component/user-domain-filter/user-domain-filter.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DomainUrlPipe } from '../../../shared/pipes/domain-url.pipe';
import { UserDomainNewsCategoryFilterComponent } from '../../../shared/component/user-domain-news-category-filter/user-domain-news-category-filter.component';
import { Mixin } from 'ts-mixer';
import { ModalBase } from '../../../shared/base/modal-base';
import { PageEditComponent } from '../../page/page-edit/page-edit.component';
import { BehaviorSubject, shareReplay, switchMap, tap } from 'rxjs';
import { menu, MenuService } from '../menu.service';
import { MenuCreateComponent } from '../menu-create/menu-create.component';
import { MenuEditComponent } from '../menu-edit/menu-edit.component';
import { TreeBase } from '../../../shared/base/tree-base';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import {
  NzTreeNodeComponent,
  NzTreeNodeDefDirective,
  NzTreeNodeIndentLineDirective,
  NzTreeNodeNoopToggleDirective,
  NzTreeNodeOptionComponent,
  NzTreeNodeToggleDirective,
  NzTreeViewComponent,
} from 'ng-zorro-antd/tree-view';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';

@Component({
  selector: 'app-menu-index',
  standalone: true,
  imports: [
    UserDomainFilterComponent,
    NzTableModule,
    NzButtonModule,
    CommonModule,
    FormsModule,
    NzPopconfirmModule,
    NzIconModule,
    DomainUrlPipe,
    UserDomainNewsCategoryFilterComponent,
    NzTooltipDirective,
    NzTreeNodeComponent,
    NzTreeNodeDefDirective,
    NzTreeNodeIndentLineDirective,
    NzTreeNodeNoopToggleDirective,
    NzTreeNodeOptionComponent,
    NzTreeNodeToggleDirective,
    NzTreeViewComponent,
    NzSwitchComponent,
  ],
  templateUrl: './menu-index.component.html',
  styleUrl: './menu-index.component.scss',
})
export class MenuIndexComponent extends Mixin(ModalBase, TreeBase<menu>) {
  loadDataSubject$ = new BehaviorSubject(true);
  loadData$ = this.loadDataSubject$.asObservable().pipe(shareReplay(1));
  constructor(private menuService: MenuService) {
    super();
  }

  menu$ = this.loadData$
    .pipe(
      switchMap(() => {
        if (this.filterData && this.filterData.domainId) {
          return this.menuService.getAllDomainMenu(this.filterData.domainId);
        } else if (this.filterData && this.filterData.userId) {
          return this.menuService.getAllUserMenu(this.filterData.userId);
        }
        return this.menuService.getAllMenu();
      })
    )
    .pipe(
      tap((menu) => {
        this.dataSource.setData(menu);
        this.treeControl.expandAll();
      })
    );

  create() {
    this.createComponentModal(
      {
        nzTitle: 'Tạo menu',
      },
      MenuCreateComponent
    ).afterClose.subscribe(() => this.loadDataSubject$.next(true));
  }

  edit(menu: menu) {
    this.createComponentModal<MenuEditComponent, menu>(
      {
        nzTitle: 'Cập nhật menu ' + menu.title,
      },
      MenuEditComponent,
      menu
    ).afterClose.subscribe(() => this.loadDataSubject$.next(true));
  }

  delete(menu: menu) {
    this.menuService
      .deleteMenu(menu.id)
      .subscribe(() => this.loadDataSubject$.next(true));
  }

  filterData!: UserDomainFilter;
  filter($event: UserDomainFilter) {
    this.filterData = $event;
    this.loadDataSubject$.next(true);
  }
}
