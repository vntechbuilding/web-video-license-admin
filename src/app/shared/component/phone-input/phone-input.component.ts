import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { InputComponentBase } from '../../base/input-component.base';
import { passwordConfirmValidators } from '../../form/password-confirm.form';

@Component({
  selector: 'app-phone-input',
  standalone: true,
  imports: [NzFormModule, NzInputModule, NzGridModule, ReactiveFormsModule],
  templateUrl: './phone-input.component.html',
  styleUrl: './phone-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true,
    },
  ],
})
export class PhoneInputComponent extends InputComponentBase implements OnInit {
  ngOnInit() {
    // this.formGroup.addControl(
    //   'phone',
    //   new FormControl(
    //     this.defaultValue['phone'] || '',
    //     this.validators['phone']
    //   )
    // );
    this.addControl(
      'phone',
      // this.setValidators(this.validators['fullname'], [Validators.required])
      this.validators['phone']
    );
  }
}
