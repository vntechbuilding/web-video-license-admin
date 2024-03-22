import { Component } from '@angular/core';
import {
  UserDomainFilter,
  UserDomainFilterComponent,
} from '../../../shared/component/user-domain-filter/user-domain-filter.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Mixin } from 'ts-mixer';
import { ModalBase } from '../../../shared/base/modal-base';
import { PaginationBase } from '../../../shared/base/pagination-base';
import {
  publisherResponse,
  PublisherService,
  publisher,
} from '../publisher.service';
import { PublisherCreateComponent } from '../publisher-create/publisher-create.component';
import { PublisherEditComponent } from '../publisher-edit/publisher-edit.component';

@Component({
  selector: 'app-publisher-index',
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
  templateUrl: './publisher-index.component.html',
  styleUrl: './publisher-index.component.scss',
})
export class PublisherIndexComponent extends Mixin(
  ModalBase,
  PaginationBase<publisherResponse>
) {
  constructor(private publisherService: PublisherService) {
    super();
  }

  publisher$ = this.createObservableData((perPage, page) => {
    if (this.filter && this.filter.userId) {
      return this.publisherService.getAllUserPublisher(
        this.filter.userId,
        perPage,
        page
      );
    }
    return this.publisherService.getAllPublisher(perPage, page);
  });

  filter!: UserDomainFilter;
  filterData($event: UserDomainFilter) {
    this.filter = $event;
    this.loadDataSubject$.next(true);
  }

  create() {
    this.createComponentModal(
      {
        nzTitle: 'Tạo publisher',
      },
      PublisherCreateComponent
    ).afterClose.subscribe(() => this.loadDataSubject$.next(true));
  }

  edit(publisher: publisher) {
    this.createComponentModal<PublisherEditComponent, publisher>(
      {
        nzTitle: 'Cập nhật publisher ' + publisher.name,
      },
      PublisherEditComponent,
      publisher
    ).afterClose.subscribe(() => this.loadDataSubject$.next(true));
  }

  delete(publisher: publisher) {
    this.publisherService
      .deletePublisher(publisher.id)
      .subscribe(() => this.loadDataSubject$.next(true));
  }
}
