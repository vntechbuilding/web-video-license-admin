import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { Mixin } from 'ts-mixer';
import { FormBase } from '../../../shared/base/form-base';
import { ModalContentBase } from '../../../shared/base/modal-content-base';
import {
  dataType,
  TemplateDataService,
  templateType,
} from '../template-data.service';
import { template } from '../../template/template.service';
import { Subscription } from 'rxjs';
import { DefaultConfigDataType } from '../../../shared/utils/default-config-data-type';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'app-template-data-create',
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
  templateUrl: './template-data-create.component.html',
  styleUrl: './template-data-create.component.scss',
})
export class TemplateDataCreateComponent
  extends Mixin(FormBase, ModalContentBase<template>)
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
          value: this.nzModalData.name,
          disabled: true,
        },
      ],
      templateType: ['', [Validators.required]],
      name: ['', [Validators.required]],
      dataType: ['', [Validators.required]],
      code: ['', [Validators.required]],
      config: ['{}', [Validators.required]],
      sortOrder: ['', [Validators.required]],
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
        .createTemplateData({
          ...(this.removeBlankString(this.validateForm.value) as any),
          templateId: this.nzModalData.id,
        })
        .pipe(this.httpErrorOperator('name'))
        .subscribe((res) => {
          this.destroyModal(res);
        });
    }
  }
}
