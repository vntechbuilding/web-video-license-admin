import { Component, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { ContentImageInputComponent } from '../../../shared/component/content-image-input/content-image-input.component';
import { DisabledInputComponent } from '../../../shared/component/disabled-input/disabled-input.component';
import { Mixin } from 'ts-mixer';
import { FormBase } from '../../../shared/base/form-base';
import { ModalContentBase } from '../../../shared/base/modal-content-base';
import { template, TemplateService } from '../template.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-template-edit',
  standalone: true,
  imports: [
    NzFormModule,
    NzGridModule,
    NzButtonModule,
    NzInputModule,
    ReactiveFormsModule,
    NzSelectModule,
    CommonModule,
    ContentImageInputComponent,
    DisabledInputComponent,
  ],
  templateUrl: './template-edit.component.html',
  styleUrl: './template-edit.component.scss',
})
export class TemplateEditComponent
  extends Mixin(FormBase, ModalContentBase<template>)
  implements OnInit
{
  autoImagePath = environment.autoImagePath;
  constructor(private templateService: TemplateService) {
    super();
  }
  ngOnInit() {
    this.defaultValue = this.nzModalData;
    this.validateForm = this.fb.group({
      name: [this.nzModalData.name, [Validators.required]],
      description: [this.nzModalData.description, [Validators.required]],
      version: [this.nzModalData.version, [Validators.required]],
    });
  }

  submitForm() {
    if (this.formValid()) {
      this.templateService
        .updateTemplate({
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
