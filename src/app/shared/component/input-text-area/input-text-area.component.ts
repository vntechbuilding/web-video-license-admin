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
import { InputComponentBase } from '../../base/input-component.base';
import { Subscription } from 'rxjs';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-input-text-area',
  standalone: true,
  imports: [NzFormModule, NzGridModule, ReactiveFormsModule, NzInputModule],
  templateUrl: './input-text-area.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextAreaComponent),
      multi: true,
    },
  ],
  styleUrl: './input-text-area.component.scss',
})
export class InputTextAreaComponent
  extends InputComponentBase
  implements OnInit, OnDestroy
{
  @Output('content') content = new EventEmitter<string>();
  @Input('label') label: string = 'Nội dung';
  @Input('rows') rows: number = 4;
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
