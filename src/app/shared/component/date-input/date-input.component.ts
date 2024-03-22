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
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { InputComponentBase } from '../../base/input-component.base';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-date-input',
  standalone: true,
  imports: [
    NzFormModule,
    NzGridModule,
    ReactiveFormsModule,
    NzInputModule,
    CommonModule,
    NzDatePickerModule,
  ],
  templateUrl: './date-input.component.html',
  styleUrl: './date-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true,
    },
  ],
})
export class DateInputComponent
  extends InputComponentBase
  implements OnInit, OnDestroy
{
  @Output('date') date = new EventEmitter<Date>();
  @Input('dateField') dateField: string = 'date';
  @Input('label') label: string = 'Ngày';
  dateSubscription!: Subscription;
  ngOnInit() {
    this.addControl(this.dateField, this.validators[this.dateField]);
    this.dateSubscription = this.formGroup
      .get(this.dateField)
      ?.valueChanges.subscribe((value) =>
        this.date.emit(value)
      ) as Subscription;
  }
  ngOnDestroy() {
    if (this.dateSubscription) this.dateSubscription.unsubscribe();
  }
}
