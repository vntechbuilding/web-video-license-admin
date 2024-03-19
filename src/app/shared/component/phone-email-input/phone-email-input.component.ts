import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { PhoneInputComponent } from '../phone-input/phone-input.component';
import { EmailInputComponent } from '../email-input/email-input.component';
import { InputComponentBase } from '../../base/input-component.base';
import { UsernamePasswordConfirmComponent } from '../username-password-confirm/username-password-confirm.component';

@Component({
  selector: 'app-phone-email-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PhoneInputComponent,
    EmailInputComponent,
    UsernamePasswordConfirmComponent,
  ],
  templateUrl: './phone-email-input.component.html',
  styleUrl: './phone-email-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneEmailInputComponent),
      multi: true,
    },
  ],
})
export class PhoneEmailInputComponent extends InputComponentBase {}
