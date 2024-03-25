import { Component, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { AuthorInputByUserComponent } from '../../../shared/component/author-input-by-user/author-input-by-user.component';
import { ContentImageInputComponent } from '../../../shared/component/content-image-input/content-image-input.component';
import { DateInputComponent } from '../../../shared/component/date-input/date-input.component';
import { DisabledInputComponent } from '../../../shared/component/disabled-input/disabled-input.component';
import { DomainInputByUserComponent } from '../../../shared/component/domain-input-by-user/domain-input-by-user.component';
import { HeadMetaInputComponent } from '../../../shared/component/head-meta-input/head-meta-input.component';
import { InputCkeditorComponent } from '../../../shared/component/input-ckeditor/input-ckeditor.component';
import { InputTextAreaComponent } from '../../../shared/component/input-text-area/input-text-area.component';
import { PublisherInputByUserComponent } from '../../../shared/component/publisher-input-by-user/publisher-input-by-user.component';
import { RatingInputComponent } from '../../../shared/component/rating-input/rating-input.component';
import { UserIdInputComponent } from '../../../shared/component/user-id-input/user-id-input.component';
import { VideoInputByUserComponent } from '../../../shared/component/video-input-by-user/video-input-by-user.component';
import { Mixin } from 'ts-mixer';
import { FormBase } from '../../../shared/base/form-base';
import { ModalContentBase } from '../../../shared/base/modal-content-base';
import { page, PageService } from '../page.service';
import { environment } from '../../../../environments/environment';
import { validatorsType } from '../../../shared/base/input-component.base';

@Component({
  selector: 'app-page-edit',
  standalone: true,
  imports: [
    NzFormModule,
    NzGridModule,
    NzButtonModule,
    NzInputModule,
    ReactiveFormsModule,
    NzSelectModule,
    CommonModule,
    AuthorInputByUserComponent,
    ContentImageInputComponent,
    DateInputComponent,
    DisabledInputComponent,
    DomainInputByUserComponent,
    HeadMetaInputComponent,
    InputCkeditorComponent,
    InputTextAreaComponent,
    PublisherInputByUserComponent,
    RatingInputComponent,
    UserIdInputComponent,
    VideoInputByUserComponent,
  ],
  templateUrl: './page-edit.component.html',
  styleUrl: './page-edit.component.scss',
})
export class PageEditComponent
  extends Mixin(FormBase, ModalContentBase<page>)
  implements OnInit
{
  constructor(private pageService: PageService) {
    super();
  }
  uploadContentImageUrl = environment.uploadMetaImageThumbnailUrl;
  ngOnInit() {
    this.defaultValue = this.nzModalData;
    this.defaultValue['userId'] = this.nzModalData.domain?.userId;
    this.validateForm = this.fb.group({
      title: [this.nzModalData.title, [Validators.required]],
    });
  }

  override validators: validatorsType = {};

  submitForm() {
    if (this.formValid()) {
      this.pageService
        .updatePage({
          ...(this.removeBlankString(this.validateForm.value) as any),
          pageId: this.nzModalData.id,
        })
        .pipe(this.httpErrorOperator('domain'))
        .subscribe((data) => {
          this.destroyModal(data);
        });
    }
  }
}
