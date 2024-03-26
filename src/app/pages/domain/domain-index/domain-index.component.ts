import { Component } from '@angular/core';
import { Mixin } from 'ts-mixer';
import { PaginationBase } from '../../../shared/base/pagination-base';
import { domain, domainGetAll, DomainService } from '../domain.service';
import { ModalBase } from '../../../shared/base/modal-base';
import { DomainCreateComponent } from '../domain-create/domain-create.component';
import { DomainEditComponent } from '../domain-edit/domain-edit.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { omit } from 'lodash';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DomainFaviconComponent } from '../domain-favicon/domain-favicon.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-domain-index',
  standalone: true,
  imports: [
    NzTableModule,
    NzButtonModule,
    CommonModule,
    NzSwitchModule,
    FormsModule,
    NzToolTipModule,
    NzIconModule,
  ],
  templateUrl: './domain-index.component.html',
  styleUrl: './domain-index.component.scss',
})
export class DomainIndexComponent extends Mixin(
  PaginationBase<domainGetAll>,
  ModalBase
) {
  constructor(private domainService: DomainService) {
    super();
  }
  uploadFaviconUrl = environment.uploadFaviconUrl;
  override pageSize = 20;
  public domains$ = this.createObservableData((perPage, page) =>
    this.domainService.allDomains(perPage, page)
  );

  create() {
    const modal = this.createComponentModal(
      {
        nzTitle: 'Create Domain',
      },
      DomainCreateComponent
    );
    modal.afterClose.subscribe((data) => {
      if (data) this.loadDataSubject$.next(true);
    });
  }

  updateDomainFavicon(domain: domain) {
    const modal = this.createComponentModal<DomainFaviconComponent, domain>(
      {
        nzTitle: 'Update Domain Favicon ' + domain.domain,
        nzWidth: '90vw',
      },
      DomainFaviconComponent,
      domain
    );
    modal.afterClose.subscribe((data) => {
      if (data) this.loadDataSubject$.next(true);
    });
  }
  updateDomain(domain: domain) {
    const modal = this.createComponentModal<
      DomainEditComponent,
      { domain: domain }
    >(
      {
        nzTitle: 'Update Domain ' + domain.domain,
      },
      DomainEditComponent,
      {
        domain,
      }
    );
    modal.afterClose.subscribe((data) => {
      if (data) this.loadDataSubject$.next(true);
    });
  }

  changeDisabled(data: domain, disabled: boolean) {
    return this.domainService
      .updateDomain({
        ...omit(data, 'user'),
        disabled,
      })
      .subscribe(() => this.loadDataSubject$.next(true));
  }
  changeHttps(domain: domain, https: boolean) {
    return this.domainService
      .updateDomain({
        ...omit(domain, 'user'),
        https,
      })
      .subscribe(() => this.loadDataSubject$.next(true));
  }

  createDomain() {
    this.createComponentModal(
      {
        nzTitle: 'Tạo domain',
      },
      DomainCreateComponent
    ).afterClose.subscribe(() => this.loadDataSubject$.next(true));
  }

  editDomain(data: domain) {
    this.createComponentModal<DomainEditComponent, domain>(
      {
        nzTitle: 'Sửa thông tin domain',
      },
      DomainEditComponent,
      data
    ).afterClose.subscribe(() => this.loadDataSubject$.next(true));
  }
}
