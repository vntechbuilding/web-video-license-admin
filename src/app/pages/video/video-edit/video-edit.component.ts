import { Component, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { ContentImageInputComponent } from '../../../shared/component/content-image-input/content-image-input.component';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { UserIdInputComponent } from '../../../shared/component/user-id-input/user-id-input.component';
import { DateInputComponent } from '../../../shared/component/date-input/date-input.component';
import { DurationInputComponent } from '../../../shared/component/duration-input/duration-input.component';
import { Mixin } from 'ts-mixer';
import { FormBase } from '../../../shared/base/form-base';
import { ModalContentBase } from '../../../shared/base/modal-content-base';
import { video, VideoService } from '../video.service';

@Component({
  selector: 'app-video-edit',
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
  templateUrl: './video-edit.component.html',
  styleUrl: './video-edit.component.scss',
})
export class VideoEditComponent
  extends Mixin(FormBase, ModalContentBase<video>)
  implements OnInit
{
  constructor(private video: VideoService) {
    super();
  }
  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [this.nzModalData.name, [Validators.required]],
      description: [this.nzModalData.description, [Validators.required]],
      duration: [this.nzModalData.duration, [Validators.required]],
      totalWatch: [this.nzModalData.totalWatch, [Validators.required]],
      uploadDate: [this.nzModalData.uploadDate, [Validators.required]],
    });
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
      this.video
        .updateVideo({
          ...(this.removeBlankString(this.validateForm.value) as any),
          videoId: this.nzModalData.id,
        })
        .pipe(this.httpErrorOperator('author'))
        .subscribe((res) => {
          this.destroyModal(res);
        });
    }
  }
}
