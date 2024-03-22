import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputComponentBase } from '../../base/input-component.base';
import { Subscription } from 'rxjs';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// import Editor from './../../../../../../custom-ckeditor';
import Editor from '@vntechbuilding/custom-ckeditor';
@Component({
  selector: 'app-input-ckeditor',
  standalone: true,
  imports: [
    NzFormModule,
    NzGridModule,
    ReactiveFormsModule,
    CommonModule,
    CKEditorModule,
  ],
  templateUrl: './input-ckeditor.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCkeditorComponent),
      multi: true,
    },
  ],
  styleUrl: './input-ckeditor.component.scss',
})
export class InputCkeditorComponent
  extends InputComponentBase
  implements OnInit, OnDestroy
{
  constructor() {
    super();
  }
  public Editor = Editor.Editor;
  @Output('content') content = new EventEmitter<string>();
  @Input('label') label: string = 'Nội dung';
  @Input('field') field: string = 'content';
  contentSubscription!: Subscription;
  ngOnInit() {
    this.addControl(
      this.field,
      this.validators[this.field],
      this.defaultValue[this.field]
    );
    this.contentSubscription = this.formGroup
      .get(this.field)
      ?.valueChanges.subscribe((value) => {
        this.content.next(value);
      }) as Subscription;
  }
  ngOnDestroy() {
    if (this.contentSubscription) this.contentSubscription.unsubscribe();
  }
}
