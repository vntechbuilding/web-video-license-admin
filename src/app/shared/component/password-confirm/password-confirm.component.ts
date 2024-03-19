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
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import {
  PasswordConfirmForm,
  PasswordConfirmFormError,
  PasswordConfirmValidator,
  passwordConfirmValidators,
} from '../../form/password-confirm.form';
import {
  InputComponentBase,
  InputComponentBaseInput,
  InputComponentBaseOutput,
} from '../../base/input-component.base';
import { FormErrorType } from '../../base/form-base';

@Component({
  selector: 'app-password-confirm',
  standalone: true,
  imports: [NzFormModule, NzInputModule, NzGridModule, ReactiveFormsModule],
  templateUrl: './password-confirm.component.html',
  styleUrl: './password-confirm.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordConfirmComponent),
      multi: true,
    },
  ],
  inputs: InputComponentBaseInput,
  outputs: InputComponentBaseOutput,
})
export class PasswordConfirmComponent
  extends InputComponentBase
  implements OnInit
{
  override validatorError: FormErrorType = PasswordConfirmFormError;
  ngOnInit() {
    this.addControl(
      'password',
      // this.setValidators(this.validators['fullname'], [Validators.required])
      passwordConfirmValidators.password
    );
    this.addControl(
      'passwordConfirm',
      // this.setValidators(this.validators['fullname'], [Validators.required])
      passwordConfirmValidators.passwordConfirm
    );
    this.formGroup.addValidators(PasswordConfirmValidator.validators);
    // console.log(this.validatorError);
    this.emitNewErrorMsg('password');
    this.emitNewErrorMsg('passwordConfirm');
  }
}
