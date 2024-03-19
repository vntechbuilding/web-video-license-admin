import { Component, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { PasswordConfirmComponent } from '../../../shared/component/password-confirm/password-confirm.component';
import { UsernamePasswordConfirmComponent } from '../../../shared/component/username-password-confirm/username-password-confirm.component';
import { FullnamePhoneEmailInputComponent } from '../../../shared/component/fullname-phone-email-input/fullname-phone-email-input.component';
import { DisabledInputComponent } from '../../../shared/component/disabled-input/disabled-input.component';
import { CommonModule } from '@angular/common';
import { Mixin } from 'ts-mixer';
import { FormBase, FormErrorType } from '../../../shared/base/form-base';
import { ModalContentBase } from '../../../shared/base/modal-content-base';
import { userCreate, UserService } from '../../user/user.service';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    NzButtonModule,
    ReactiveFormsModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NzSwitchModule,
    PasswordConfirmComponent,
    UsernamePasswordConfirmComponent,
    FullnamePhoneEmailInputComponent,
    DisabledInputComponent,
    CommonModule,
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent
  extends Mixin(FormBase, ModalContentBase)
  implements OnInit
{
  constructor(private userService: UserService) {
    super();
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      accountName: [
        '',
        {
          required: 'Account name is not valid',
        },
      ],
    });
    //Đăng ký thay đổi giá trị của form và check validation
    // this.formValidationSub();
  }
  override defaultValue: Partial<userCreate> = {
    username: 'test',
    disabled: false,
  };
  override validators = {
    username: [Validators.minLength(4), Validators.maxLength(20)],
    fullName: [Validators.required],
    email: [Validators.required],
  };

  public override _formErrorMsg: FormErrorType = {
    username: {
      required: 'Username is not valid',
      minlength: 'Username is too short',
      maxlength: 'Username is too long',
    },
    email: {
      required: 'Email is required',
    },
  };

  submitForm() {
    if (this.formValid()) {
      this.userService
        .createUser(this.validateForm.value)
        .pipe(this.httpErrorOperator('username'))
        .subscribe((createData) => {
          this.destroyModal(createData);
        });
    }
  }
}
