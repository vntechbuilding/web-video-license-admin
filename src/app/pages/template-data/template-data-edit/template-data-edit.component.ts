import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { Mixin } from 'ts-mixer';
import { FormBase } from '../../../shared/base/form-base';
import { ModalContentBase } from '../../../shared/base/modal-content-base';
import {
  dataType,
  templateData,
  TemplateDataService,
  templateType,
} from '../template-data.service';
import { Subscription } from 'rxjs';
import { DefaultConfigDataType } from '../../../shared/utils/default-config-data-type';

@Component({
  selector: 'app-template-data-edit',
  standalone: true,
  imports: [
    NzFormModule,
    NzGridModule,
    NzButtonModule,
    NzInputModule,
    ReactiveFormsModule,
    NzSelectModule,
    CommonModule,
    NzInputNumberComponent,
  ],
  templateUrl: './template-data-edit.component.html',
  styleUrl: './template-data-edit.component.scss',
})
export class TemplateDataEditComponent
  extends Mixin(FormBase, ModalContentBase<templateData>)
  implements OnInit, OnDestroy
{
  templateType = Object.keys(templateType);
  dataType = Object.keys(dataType);
  constructor(private templateDataService: TemplateDataService) {
    super();
  }

  dataTypeSubscription!: Subscription;
  ngOnInit() {
    this.validateForm = this.fb.group({
      template: [
        {
          value: this.nzModalData.template?.name,
          disabled: true,
        },
      ],
      templateType: [this.nzModalData.templateType, [Validators.required]],
      name: [this.nzModalData.name, [Validators.required]],
      dataType: [this.nzModalData.dataType, [Validators.required]],
      code: [this.nzModalData.code, [Validators.required]],
      config: [
        JSON.stringify(this.nzModalData.config, null, 2),
        [Validators.required],
      ],
      sortOrder: [this.nzModalData.sortOrder, [Validators.required]],
    });
    this.dataTypeSubscription = this.validateForm
      .get('dataType')
      ?.valueChanges.subscribe((value) => {
        this.validateForm
          .get('config')
          ?.setValue(
            (DefaultConfigDataType[
              value as keyof typeof DefaultConfigDataType
            ] as string) || JSON.stringify({})
          );
      }) as Subscription;
  }

  onDestroy() {
    if (this.dataTypeSubscription) this.dataTypeSubscription.unsubscribe();
  }
  submitForm() {
    if (this.formValid()) {
      this.templateDataService
        .updateTemplateData({
          ...(this.removeBlankString(this.validateForm.value) as any),
          templateId: this.nzModalData.templateId,
          templateDataId: this.nzModalData.id,
        })
        .pipe(this.httpErrorOperator('name'))
        .subscribe((res) => {
          this.destroyModal(res);
        });
    }
  }
}
