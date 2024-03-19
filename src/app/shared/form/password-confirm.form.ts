import { Validators } from '@angular/forms';
import { ConfirmedValidatorClass } from '../validators/confirmed-validator';

export const passwordConfirmValidators = {
  password: [
    Validators.required,
    Validators.pattern(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/
    ),
  ],
  passwordConfirm: [Validators.required],
};
export const PasswordConfirmForm = {
  password: [null, passwordConfirmValidators.password],
  passwordConfirm: [null, passwordConfirmValidators.passwordConfirm],
};
export const PasswordConfirmValidator = {
  validators: ConfirmedValidatorClass.confirmed('password', 'passwordConfirm'),
};
export const PasswordConfirmFormError = {
  password: {
    required: 'Vui lòng nhập mật khẩu!',
    pattern:
      'Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường và số!',
  },
  passwordConfirm: {
    required: 'Vui lòng nhập mật khẩu xác nhận!',
    confirmedValidator: 'Nhập lại mật khẩu không chính xác',
  },
};
