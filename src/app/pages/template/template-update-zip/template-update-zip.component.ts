import { Component, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Mixin } from 'ts-mixer';
import { FormBase } from '../../../shared/base/form-base';
import { ModalContentBase } from '../../../shared/base/modal-content-base';
import { template, TemplateService } from '../template.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-template-update-zip',
  standalone: true,
  imports: [
    NzFormModule,
    NzGridModule,
    NzButtonModule,
    NzInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './template-update-zip.component.html',
  styleUrl: './template-update-zip.component.scss',
})
export class TemplateUpdateZipComponent
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
      zipFile: ['', [Validators.required]],
    });
  }

  selectedFile: File | null = null;
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  submitForm() {
    if (this.formValid() && this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('templateId', this.nzModalData.id);
      this.templateService
        .updateZip(formData)
        .pipe(this.httpErrorOperator('name'))
        .subscribe((res) => {
          this.destroyModal(res);
        });
    }
  }
}
