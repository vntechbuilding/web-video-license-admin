import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FullnameInputComponent } from '../fullname-input/fullname-input.component';
import { PhoneEmailInputComponent } from '../phone-email-input/phone-email-input.component';
import { InputComponentBase } from '../../base/input-component.base';
import { UsernamePasswordConfirmComponent } from '../username-password-confirm/username-password-confirm.component';

@Component({
  selector: 'app-fullname-phone-email-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FullnameInputComponent,
    PhoneEmailInputComponent,
    UsernamePasswordConfirmComponent,
  ],
  templateUrl: './fullname-phone-email-input.component.html',
  styleUrl: './fullname-phone-email-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FullnamePhoneEmailInputComponent),
      multi: true,
    },
  ],
})
export class FullnamePhoneEmailInputComponent extends InputComponentBase {}
