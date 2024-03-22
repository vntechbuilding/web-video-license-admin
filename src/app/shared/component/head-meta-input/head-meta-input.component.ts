import { Component, forwardRef, OnInit } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { InputComponentBase } from '../../base/input-component.base';
import {
  ImageCroppedEvent,
  ImageCropperModule,
  LoadedImage,
} from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import {
  GetImageDimensions,
  imageDimensions,
} from '../../utils/get-image-dimensions';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-head-meta-input',
  standalone: true,
  imports: [
    NzFormModule,
    NzInputModule,
    NzGridModule,
    ReactiveFormsModule,
    ImageCropperModule,
    CommonModule,
    NzButtonModule,
    NzPopconfirmModule,
  ],
  templateUrl: './head-meta-input.component.html',
  styleUrl: './head-meta-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HeadMetaInputComponent),
      multi: true,
    },
  ],
})
export class HeadMetaInputComponent
  extends InputComponentBase
  implements OnInit
{
  public uploadMetaImageUrl = environment.uploadMetaImageThumbnailUrl;
  constructor(private sanitizer: DomSanitizer) {
    super();
  }
  metaImage!: string;
  metaImageDimensions!: imageDimensions;
  ngOnInit() {
    this.reader.onloadend = () => {
      this.formGroup.get('metaImage')?.setValue(this.reader.result);
      this.metaImage = this.reader.result as string;
      GetImageDimensions(this.metaImage).then(
        (dimensions) => (this.metaImageDimensions = dimensions)
      );
    };
    this.addControl(
      'metaTitle',
      this.setValidators(this.validators['metaTitle'], [Validators.required])
    );
    this.addControl(
      'metaDescription',
      this.setValidators(this.validators['metaDescription'], [
        Validators.required,
      ])
    );
    this.addControl(
      'metaImage',
      this.setValidators(this.validators['metaImage'], [])
    );
    this.emitNewErrorMsg('metaTitle');
    this.emitNewErrorMsg('metaDescription');
  }
  override validatorError = {
    metaTitle: {
      required: 'Meta title không được để trống',
    },
    metaDescription: {
      required: 'Meta description không được để trống',
    },
  };
  imageChangedEvent: any = '';
  croppedImage: any = '';
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  reader = new FileReader();
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
      event.objectUrl as any
    );
    this.reader.readAsDataURL(event.blob as Blob);
    // console.log(event);
    // console.log(event.blob);
    // console.log(event.base64);
    // event.blob can be used to upload the cropped image
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  cancelMetaImage() {
    this.imageChangedEvent = null;
    this.croppedImage = null;
    this.metaImageDimensions = null as any;
    this.metaImage = '';
    this.formGroup.get('metaImage')?.setValue('');
  }
}
