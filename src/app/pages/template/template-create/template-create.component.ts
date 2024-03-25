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
import { VideoService } from '../../video/video.service';
import { TemplateService } from '../template.service';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ContentImageInputComponent } from '../../../shared/component/content-image-input/content-image-input.component';
import { DisabledInputComponent } from '../../../shared/component/disabled-input/disabled-input.component';

@Component({
  selector: 'app-template-create',
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
  templateUrl: './template-create.component.html',
  styleUrl: './template-create.component.scss',
})
export class TemplateCreateComponent
  extends Mixin(FormBase, ModalContentBase)
  implements OnInit
{
  constructor(private templateService: TemplateService) {
    super();
  }
  ngOnInit() {
    this.validateForm = this.fb.group({
      zipFile: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      version: ['', [Validators.required]],
    });
  }

  selectedFile: File | null = null;
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  submitForm() {
    if (this.formValid()) {
      const formData = new FormData();
      const formValue = this.removeBlankString(this.validateForm.value) as any;
      for (const key in formValue) {
        if (key !== 'zipFile') formData.append(key, formValue[key]);
      }
      if (this.selectedFile) formData.append('file', this.selectedFile);
      this.templateService
        .createTemplate(formData)
        .pipe(this.httpErrorOperator('name'))
        .subscribe((res) => {
          this.destroyModal(res);
        });
    }
  }
}
