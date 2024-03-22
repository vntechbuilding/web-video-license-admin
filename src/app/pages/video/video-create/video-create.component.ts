import { Component, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import {
  AbstractControl,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { Mixin } from 'ts-mixer';
import { FormBase } from '../../../shared/base/form-base';
import { ModalContentBase } from '../../../shared/base/modal-content-base';
import { VideoService } from '../video.service';
import { ContentImageInputComponent } from '../../../shared/component/content-image-input/content-image-input.component';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { UserIdInputComponent } from '../../../shared/component/user-id-input/user-id-input.component';
import { DateInputComponent } from '../../../shared/component/date-input/date-input.component';
import { DurationInputComponent } from '../../../shared/component/duration-input/duration-input.component';

@Component({
  selector: 'app-video-create',
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
    NzInputNumberComponent,
    UserIdInputComponent,
    DateInputComponent,
    DurationInputComponent,
  ],
  templateUrl: './video-create.component.html',
  styleUrl: './video-create.component.scss',
})
export class VideoCreateComponent
  extends Mixin(FormBase, ModalContentBase)
  implements OnInit
{
  constructor(private video: VideoService) {
    super();
  }
  ngOnInit() {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      totalWatch: [0, [Validators.required]],
      uploadDate: ['', [Validators.required]],
      videoFile: ['', [Validators.required]],
    });
  }

  selectedFile: File | null = null;
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
  override _formErrorMsg = {
    userId: {
      required: 'User không được để trống',
    },
    name: {
      required: 'Tên video không hợp lệ',
    },
    description: {
      required: 'Mô tả không hợp lệ',
    },
    duration: {
      required: 'Thời lượng không hợp lệ',
    },
    totalWatch: {
      required: 'Lượt xem không hợp lệ',
    },
    uploadDate: {
      required: 'Ngày tải lên không hợp lệ',
    },
  };

  submitForm() {
    if (this.formValid()) {
      const formData = new FormData();
      const formValue = this.removeBlankString(this.validateForm.value) as any;
      for (const key in formValue) {
        if (key !== 'videoFile' && key !== 'uploadDate')
          formData.append(key, formValue[key]);
      }
      const uploadDate = new Date(formValue.uploadDate);
      const isoDateStr = uploadDate.toISOString();
      formData.append('uploadDate', isoDateStr);
      if (this.selectedFile) formData.append('file', this.selectedFile);
      this.video
        .createVideo(formData)
        .pipe(this.httpErrorOperator('author'))
        .subscribe((res) => {
          this.destroyModal(res);
        });
    }
  }
}
