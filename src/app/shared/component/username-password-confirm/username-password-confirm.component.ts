import { Component, forwardRef } from '@angular/core';
import {
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { UsernameComponent } from '../username/username.component';
import { PasswordConfirmComponent } from '../password-confirm/password-confirm.component';
import {
  InputComponentBase,
  InputComponentBaseInput,
  InputComponentBaseOutput,
} from '../../base/input-component.base';

@Component({
  selector: 'app-username-password-confirm',
  standalone: true,
  imports: [
    NzFormModule,
    NzInputModule,
    NzGridModule,
    ReactiveFormsModule,
    UsernameComponent,
    PasswordConfirmComponent,
  ],
  templateUrl: './username-password-confirm.component.html',
  styleUrl: './username-password-confirm.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsernamePasswordConfirmComponent),
      multi: true,
    },
  ],
  inputs: InputComponentBaseInput,
  outputs: InputComponentBaseOutput,
})
export class UsernamePasswordConfirmComponent extends InputComponentBase {}
