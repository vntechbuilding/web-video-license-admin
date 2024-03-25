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
import { Mixin } from 'ts-mixer';
import { ModalBase } from '../../../shared/base/modal-base';
import { PaginationBase } from '../../../shared/base/pagination-base';
import { environment } from '../../../../environments/environment';
import { page, pageResponse, PageService } from '../page.service';
import { PageEditComponent } from '../page-edit/page-edit.component';
import { PageCreateComponent } from '../page-create/page-create.component';
import { DomainUrlPipe } from '../../../shared/pipes/domain-url.pipe';
import { UserDomainNewsCategoryFilterComponent } from '../../../shared/component/user-domain-news-category-filter/user-domain-news-category-filter.component';

@Component({
  selector: 'app-page-index',
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
  ],
  templateUrl: './page-index.component.html',
  styleUrl: './page-index.component.scss',
})
export class PageIndexComponent extends Mixin(
  ModalBase,
  PaginationBase<pageResponse>
) {
  videoUploadPath = environment.videoUploadPath;
  imageUploadPath = environment.uploadMetaImageThumbnailUrl;
  constructor(private pageService: PageService) {
    super();
  }

  page$ = this.createObservableData((perPage, page) => {
    if (this.filterData && this.filterData.domainId) {
      return this.pageService.getAllDomainPage(
        this.filterData.domainId,
        perPage,
        page
      );
    } else if (this.filterData && this.filterData.userId) {
      return this.pageService.getAllUserPage(
        this.filterData.userId,
        perPage,
        page
      );
    }
    return this.pageService.getAllPage(perPage, page);
  });

  create() {
    this.createComponentModal(
      {
        nzTitle: 'Tạo trang',
        nzWidth: '100vw',
      },
      PageCreateComponent
    ).afterClose.subscribe(() => this.loadDataSubject$.next(true));
  }

  edit(page: page) {
    this.createComponentModal<PageEditComponent, page>(
      {
        nzTitle: 'Cập nhật trang ' + page.title,
        nzWidth: '100vw',
      },
      PageEditComponent,
      page
    ).afterClose.subscribe(() => this.loadDataSubject$.next(true));
  }

  delete(page: page) {
    this.pageService
      .deletePage(page.id)
      .subscribe(() => this.loadDataSubject$.next(true));
  }

  filterData!: UserDomainFilter;
  filter($event: UserDomainFilter) {
    this.filterData = $event;
    this.loadDataSubject$.next(true);
  }
}
