import { Component } from '@angular/core';
import {
  UserDomainFilter,
  UserDomainFilterComponent,
} from '../../../shared/component/user-domain-filter/user-domain-filter.component';
import { Mixin } from 'ts-mixer';
import { ModalBase } from '../../../shared/base/modal-base';
import { author, authorResponse, AuthorService } from '../author.service';
import { AuthorCreateComponent } from '../author-create/author-create.component';
import { AuthorEditComponent } from '../author-edit/author-edit.component';
import { PaginationBase } from '../../../shared/base/pagination-base';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { NzIconDirective, NzIconModule } from 'ng-zorro-antd/icon';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

@Component({
  selector: 'app-author-index',
  standalone: true,
  imports: [
    UserDomainFilterComponent,
    NzTableModule,
    NzButtonModule,
    CommonModule,
    FormsModule,
    NzPopoverModule,
    NzIconModule,
  ],
  templateUrl: './author-index.component.html',
  styleUrl: './author-index.component.scss',
})
export class AuthorIndexComponent extends Mixin(
  ModalBase,
  PaginationBase<authorResponse>
) {
  constructor(private authorService: AuthorService) {
    super();
  }

  author$ = this.createObservableData((perPage, page) => {
    if (this.filter && this.filter.userId) {
      return this.authorService.getAllUserAuthor(
        this.filter.userId,
        perPage,
        page
      );
    }
    return this.authorService.getAllAuthor(perPage, page);
  });

  filter!: UserDomainFilter;
  filterData($event: UserDomainFilter) {
    this.filter = $event;
    this.loadDataSubject$.next(true);
  }

  create() {
    this.createComponentModal(
      {
        nzTitle: 'Tạo author',
      },
      AuthorCreateComponent
    ).afterClose.subscribe(() => this.loadDataSubject$.next(true));
  }

  edit(author: author) {
    this.createComponentModal<AuthorEditComponent, author>(
      {
        nzTitle: 'Cập nhật author ' + author.name,
      },
      AuthorEditComponent,
      author
    ).afterClose.subscribe(() => this.loadDataSubject$.next(true));
  }

  delete(author: author) {
    this.authorService
      .deleteAuthor(author.id)
      .subscribe(() => this.loadDataSubject$.next(true));
  }
}
