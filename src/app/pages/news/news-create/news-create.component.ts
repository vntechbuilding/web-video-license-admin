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
import { Mixin } from 'ts-mixer';
import { FormBase } from '../../../shared/base/form-base';
import { ModalContentBase } from '../../../shared/base/modal-content-base';
import { HeadMetaInputComponent } from '../../../shared/component/head-meta-input/head-meta-input.component';
import { DisabledInputComponent } from '../../../shared/component/disabled-input/disabled-input.component';
import { RatingInputComponent } from '../../../shared/component/rating-input/rating-input.component';
import { environment } from '../../../../environments/environment';
import { debounceTime } from 'rxjs';
import { validatorsType } from '../../../shared/base/input-component.base';
import { DomainInputByUserComponent } from '../../../shared/component/domain-input-by-user/domain-input-by-user.component';
import { CategoryInputByDomainComponent } from '../../../shared/component/category-input-by-domain/category-input-by-domain.component';
import { VideoInputByUserComponent } from '../../../shared/component/video-input-by-user/video-input-by-user.component';
import { AuthorInputByUserComponent } from '../../../shared/component/author-input-by-user/author-input-by-user.component';
import { PublisherInputByUserComponent } from '../../../shared/component/publisher-input-by-user/publisher-input-by-user.component';
import { DateInputComponent } from '../../../shared/component/date-input/date-input.component';
import { InputCkeditorComponent } from '../../../shared/component/input-ckeditor/input-ckeditor.component';
import { InputTextAreaComponent } from '../../../shared/component/input-text-area/input-text-area.component';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-create',
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
    HeadMetaInputComponent,
    UserIdInputComponent,
    DisabledInputComponent,
    RatingInputComponent,
    DomainInputByUserComponent,
    CategoryInputByDomainComponent,
    VideoInputByUserComponent,
    AuthorInputByUserComponent,
    PublisherInputByUserComponent,
    DateInputComponent,
    InputCkeditorComponent,
    InputTextAreaComponent,
  ],
  templateUrl: './news-create.component.html',
  styleUrl: './news-create.component.scss',
})
export class NewsCreateComponent
  extends Mixin(FormBase, ModalContentBase)
  implements OnInit
{
  constructor(private newsService: NewsService) {
    super();
  }
  uploadContentImageUrl = environment.uploadMetaImageThumbnailUrl;
  ngOnInit() {
    this.validateForm = this.fb.group({
      title: ['', [Validators.required]],
      userId: ['', [Validators.required]],
      domainId: ['', [Validators.required]],
    });
    // this.validateForm.valueChanges
    //   .pipe(debounceTime(1000))
    //   .subscribe((data) => console.log(data));
  }

  override validators: validatorsType = {};

  override _formErrorMsg = {
    domain: {
      required: 'Domain không được để trống',
    },
    userId: {
      required: 'User không được để trống',
    },
  };

  submitForm() {
    if (this.formValid()) {
      this.newsService
        .createNews(this.removeBlankString(this.validateForm.value) as any)
        .pipe(this.httpErrorOperator('domain'))
        .subscribe((data) => {
          this.destroyModal(data);
        });
    }
  }
}
