import { Component, forwardRef, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import {
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputComponentBase } from '../../base/input-component.base';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
@Component({
  selector: 'app-rating-input',
  standalone: true,
  imports: [
    NzFormModule,
    NzInputModule,
    NzGridModule,
    ReactiveFormsModule,
    CommonModule,
    ImageCropperModule,
    NzInputNumberModule,
  ],
  templateUrl: './rating-input.component.html',
  styleUrl: './rating-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingInputComponent),
      multi: true,
    },
  ],
})
export class RatingInputComponent extends InputComponentBase implements OnInit {
  constructor() {
    super();
  }
  ngOnInit() {
    this.addControl(
      'ratingValue',
      this.setValidators(this.validators['ratingValue'], [Validators.required]),
      5
    );
    this.addControl(
      'bestRating',
      this.setValidators(this.validators['bestRating'], [Validators.required]),
      5
    );
    this.addControl(
      'ratingCount',
      this.setValidators(this.validators['ratingCount'], []),
      Math.floor(Math.random() * 50000 + 500)
    );
    this.addControl(
      'totalRead',
      this.setValidators(this.validators['totalRead'], [Validators.required]),
      Math.floor(Math.random() * 500000 + 10000)
    );
    this.emitNewErrorMsg('ratingValue');
    this.emitNewErrorMsg('bestRating');
    this.emitNewErrorMsg('ratingCount');
    this.emitNewErrorMsg('totalRead');
  }
  override validatorError = {
    ratingValue: {
      required: 'Rating value không được để trống',
    },
    bestRating: {
      required: 'Best rating không được để trống',
    },
    ratingCount: {
      required: 'Rating count không được để trống',
    },
    totalRead: {
      required: 'Total read không được để trống',
    },
  };
}
