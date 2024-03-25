import { Component, OnInit } from '@angular/core';
import { Mixin } from 'ts-mixer';
import { ModalBase } from '../../../shared/base/modal-base';
import { TemplateCreateComponent } from '../template-create/template-create.component';
import { PaginationBase } from '../../../shared/base/pagination-base';
import { environment } from '../../../../environments/environment';
import {
  template,
  templateResponse,
  TemplateService,
} from '../template.service';
import { TemplateEditComponent } from '../template-edit/template-edit.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';
import { omit } from 'lodash';
import { TemplateUpdateZipComponent } from '../template-update-zip/template-update-zip.component';

@Component({
  selector: 'app-template-index',
  standalone: true,
  imports: [
    NzTableModule,
    NzButtonModule,
    CommonModule,
    FormsModule,
    NzPopconfirmModule,
    NzIconModule,
    NzSwitchComponent,
  ],
  templateUrl: './template-index.component.html',
  styleUrl: './template-index.component.scss',
})
export class TemplateIndexComponent extends Mixin(
  ModalBase,
  PaginationBase<templateResponse>
) {
  autoImagePath = environment.autoImagePath;
  constructor(private templateService: TemplateService) {
    super();
  }

  template$ = this.createObservableData((perPage, page) =>
    this.templateService.getAllTemplate(perPage, page)
  );

  create() {
    this.createComponentModal(
      {
        nzTitle: 'Tạo template',
        nzWidth: '100vw',
      },
      TemplateCreateComponent
    ).afterClose.subscribe(() => this.loadDataSubject$.next(true));
  }

  edit(template: template) {
    this.createComponentModal<TemplateEditComponent, template>(
      {
        nzTitle: 'Cập nhật template ' + template.name,
        nzWidth: '100vw',
      },
      TemplateEditComponent,
      template
    ).afterClose.subscribe(() => this.loadDataSubject$.next(true));
  }

  delete(template: template) {
    this.templateService
      .deleteTemplate(template.id)
      .subscribe(() => this.loadDataSubject$.next(true));
  }

  changeDisabled(template: template, disabled: boolean) {
    this.templateService
      .updateTemplate({
        ...omit(template, 'image'),
        templateId: template.id,
        disabled,
      })
      .subscribe(() => this.loadDataSubject$.next(true));
  }

  updateZip(template: template) {
    this.createComponentModal<TemplateUpdateZipComponent, template>(
      {
        nzTitle: 'Cập nhật Zip template ' + template.name,
      },
      TemplateUpdateZipComponent,
      template
    ).afterClose.subscribe(() => this.loadDataSubject$.next(true));
  }
}
