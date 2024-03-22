import { Component } from '@angular/core';
import {
  UserDomainNewsCategoryFilter,
  UserDomainNewsCategoryFilterComponent,
} from '../../../shared/component/user-domain-news-category-filter/user-domain-news-category-filter.component';
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
import { news, newsResponse, NewsService } from '../news.service';
import { NewsCreateComponent } from '../news-create/news-create.component';
import { NewsEditComponent } from '../news-edit/news-edit.component';
import { CreateUrl } from '../../../shared/utils/create-url';
import { DomainUrlPipe } from '../../../shared/pipes/domain-url.pipe';

@Component({
  selector: 'app-news-index',
  standalone: true,
  imports: [
    UserDomainNewsCategoryFilterComponent,
    NzTableModule,
    NzButtonModule,
    CommonModule,
    FormsModule,
    NzPopconfirmModule,
    NzIconModule,
    DomainUrlPipe,
  ],
  templateUrl: './news-index.component.html',
  styleUrl: './news-index.component.scss',
})
export class NewsIndexComponent extends Mixin(
  ModalBase,
  PaginationBase<newsResponse>
) {
  videoUploadPath = environment.videoUploadPath;
  imageUploadPath = environment.uploadMetaImageThumbnailUrl;
  constructor(private newsService: NewsService) {
    super();
  }

  news$ = this.createObservableData((perPage, page) => {
    if (this.filter && this.filter.categoryId) {
      return this.newsService.getAllCategoryNews(
        this.filter.categoryId,
        perPage,
        page
      );
    } else if (this.filter && this.filter.domainId) {
      return this.newsService.getAllDomainNews(
        this.filter.domainId,
        perPage,
        page
      );
    } else if (this.filter && this.filter.userId) {
      return this.newsService.getAllUserNews(this.filter.userId, perPage, page);
    }
    return this.newsService.getAllNews(perPage, page);
  });

  create() {
    this.createComponentModal(
      {
        nzTitle: 'Tạo tin tức',
        nzWidth: '100vw',
      },
      NewsCreateComponent
    ).afterClose.subscribe(() => this.loadDataSubject$.next(true));
  }

  edit(news: news) {
    this.createComponentModal<NewsEditComponent, news>(
      {
        nzTitle: 'Cập nhật tin tức ' + news.title,
        nzWidth: '100vw',
      },
      NewsEditComponent,
      news
    ).afterClose.subscribe(() => this.loadDataSubject$.next(true));
  }

  delete(news: news) {
    this.newsService
      .deleteNews(news.id)
      .subscribe(() => this.loadDataSubject$.next(true));
  }

  filter!: UserDomainNewsCategoryFilter;

  filterData($event: UserDomainNewsCategoryFilter) {
    // console.log($event);
    this.filter = $event;
    this.loadDataSubject$.next(true);
  }
}
