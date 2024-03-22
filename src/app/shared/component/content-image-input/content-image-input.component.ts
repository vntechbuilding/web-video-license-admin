import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import {
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ImageCroppedEvent,
  ImageCropperModule,
  LoadedImage,
} from 'ngx-image-cropper';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {
  NzPopconfirmDirective,
  NzPopconfirmModule,
} from 'ng-zorro-antd/popconfirm';
import { InputComponentBase } from '../../base/input-component.base';
import { environment } from '../../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import {
  GetImageDimensions,
  imageDimensions,
} from '../../utils/get-image-dimensions';

@Component({
  selector: 'app-content-image-input',
  standalone: true,
  imports: [
    NzFormModule,
    NzInputModule,
    NzGridModule,
    ReactiveFormsModule,
    ImageCropperModule,
    CommonModule,
    NzButtonModule,
    NzPopconfirmDirective,
  ],
  templateUrl: './content-image-input.component.html',
  styleUrl: './content-image-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContentImageInputComponent),
      multi: true,
    },
  ],
})
export class ContentImageInputComponent
  extends InputComponentBase
  implements OnInit
{
  @Input('uploadContentImageUrl') uploadContentImageUrl: string =
    environment.uploadContentImageThumbnailUrl;
  @Input('label') label: string = 'Hình ảnh';
  @Input('defaultField') defaultField: string = 'image';
  @Input('aspectRatio') aspectRatio = 5 / 3;
  constructor(private sanitizer: DomSanitizer) {
    super();
  }
  metaImage!: string;
  metaImageDimensions!: imageDimensions;
  ngOnInit() {
    this.reader.onloadend = () => {
      this.formGroup.get(this.defaultField)?.setValue(this.reader.result);
      this.metaImage = this.reader.result as string;
      GetImageDimensions(this.metaImage).then(
        (dimensions) => (this.metaImageDimensions = dimensions)
      );
    };
    this.addControl(
      this.defaultField,
      this.setValidators(this.validators[this.defaultField], [])
    );
  }
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
    this.formGroup.get(this.defaultField)?.setValue('');
  }
}
