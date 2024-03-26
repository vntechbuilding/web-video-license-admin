import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Mixin } from 'ts-mixer';
import { ModalBase } from '../../../shared/base/modal-base';
import { TemplateEditComponent } from '../../template/template-edit/template-edit.component';
import { templateData, TemplateDataService } from '../template-data.service';
import { TemplateDataCreateComponent } from '../template-data-create/template-data-create.component';
import { Subject, switchMap, tap } from 'rxjs';
import { TemplateDataEditComponent } from '../template-data-edit/template-data-edit.component';
import {
  TemplateIdFilter,
  TemplateIdFilterComponent,
} from '../../../shared/component/template-id-filter/template-id-filter.component';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';

@Component({
  selector: 'app-template-data-index',
  standalone: true,
  imports: [
    NzTableModule,
    NzButtonModule,
    CommonModule,
    FormsModule,
    NzPopconfirmModule,
    NzIconModule,
    TemplateIdFilterComponent,
    NzSwitchComponent,
  ],
  templateUrl: './template-data-index.component.html',
  styleUrl: './template-data-index.component.scss',
})
export class TemplateDataIndexComponent extends Mixin(ModalBase) {
  constructor(private templateDataService: TemplateDataService) {
    super();
  }
  //
  // template$ = this.createObservableData((perPage, page) =>
  //   this.templateService.getAllTemplate(perPage, page)
  // );

  loadDataSubject$ = new Subject<TemplateIdFilter>();
  templateData$ = this.loadDataSubject$.asObservable().pipe(
    switchMap((templateData) =>
      this.templateDataService.getAllTemplateData(templateData.id)
    ),
    tap((data) => {
      this.ObjectEntriesData = this.ObjectEntries(data);
    })
  );
  ObjectEntriesData!: [string, any[]][];
  ObjectEntries(data: any) {
    return Object.entries(data) as [string, any[]][];
  }
  create() {
    this.createComponentModal<TemplateDataCreateComponent, TemplateIdFilter>(
      {
        nzTitle: 'Tạo template data ' + this.filter.name,
      },
      TemplateDataCreateComponent,
      this.filter
    ).afterClose.subscribe(() => this.loadDataSubject$.next(this.filter));
  }

  edit(templateData: templateData) {
    this.createComponentModal<TemplateDataEditComponent, templateData>(
      {
        nzTitle:
          'Cập nhật template data ' +
          templateData.name +
          ' / ' +
          templateData.template?.name,
      },
      TemplateDataEditComponent,
      templateData
    ).afterClose.subscribe(() => this.loadDataSubject$.next(this.filter));
  }

  delete(templateData: templateData) {
    this.templateDataService
      .deleteTemplateData(templateData.id)
      .subscribe(() => this.loadDataSubject$.next(this.filter));
  }

  filter!: TemplateIdFilter;
  filterData($event: TemplateIdFilter) {
    this.filter = $event;
    this.loadDataSubject$.next($event);
  }
}
