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
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { InputComponentBase } from '../../base/input-component.base';
import { Subscription } from 'rxjs';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'app-duration-input',
  standalone: true,
  imports: [
    NzFormModule,
    NzGridModule,
    ReactiveFormsModule,
    FormsModule,
    NzInputModule,
    CommonModule,
    NzInputNumberModule,
  ],
  templateUrl: './duration-input.component.html',
  styleUrl: './duration-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationInputComponent),
      multi: true,
    },
  ],
})
export class DurationInputComponent
  extends InputComponentBase
  implements OnInit, OnDestroy
{
  constructor(private fb: FormBuilder) {
    super();
  }
  @Output('duration') duration = new EventEmitter<string>();
  @Input('durationField') durationField: string = 'duration';
  @Input('label') label: string = 'Thời lượng';
  durationSubscription!: Subscription;
  ngOnInit() {
    this.addControl(this.durationField, this.validators[this.durationField]);
    this.durationSubscription = this.formGroup
      .get(this.durationField)
      ?.valueChanges.subscribe((value) =>
        this.duration.emit(value)
      ) as Subscription;

    this.form = this.fb.group({
      hours: [0, [Validators.required, Validators.min(0)]],
      minutes: [
        0,
        [Validators.required, Validators.min(0), Validators.max(59)],
      ],
      seconds: [
        0,
        [Validators.required, Validators.min(0), Validators.max(59)],
      ],
    });
    const defaultValue = this.defaultValue[this.durationField];

    if (defaultValue) {
      this.writeValue(defaultValue);
    }
    this.form.valueChanges.subscribe((value) => {
      if (this.form.valid) {
        const iso8601Duration = `PT${value.hours ? value.hours + 'H' : ''}${
          value.minutes ? value.minutes + 'M' : ''
        }${value.seconds}S`;
        this.formGroup.get(this.durationField)?.setValue(iso8601Duration);
      }
    });
  }
  ngOnDestroy() {
    if (this.durationSubscription) this.durationSubscription.unsubscribe();
  }
  form!: FormGroup;
  override writeValue(iso8601Duration: string): void {
    if (iso8601Duration) {
      const match = iso8601Duration.match(/PT(\d+)H(\d+)M(\d+)S/);
      if (match) {
        this.form.setValue(
          {
            hours: match[1],
            minutes: match[2],
            seconds: match[3],
          },
          { emitEvent: false }
        );
      } else {
        const matchMinutes = iso8601Duration.match(/PT(\d+)M(\d+)S/);
        if (matchMinutes) {
          this.form.setValue(
            {
              hours: 0,
              minutes: matchMinutes[1],
              seconds: matchMinutes[2],
            },
            { emitEvent: false }
          );
        }
      }
    }
  }
}
