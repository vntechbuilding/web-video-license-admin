import { Component } from '@angular/core';
import { ChangePasswordComponent } from '../../../shared/component/change-password/change-password.component';
import { Mixin } from 'ts-mixer';
import { FormBase } from '../../../shared/base/form-base';
import { ModalContentBase } from '../../../shared/base/modal-content-base';
import { user, UserService } from '../../user/user.service';

@Component({
  selector: 'app-user-change-password',
  standalone: true,
  imports: [ChangePasswordComponent],
  templateUrl: './user-change-password.component.html',
  styleUrl: './user-change-password.component.scss',
})
export class UserChangePasswordComponent extends Mixin(
  FormBase,
  ModalContentBase<user>
) {
  constructor(public userService: UserService) {
    super();
  }

  submit(data: any) {
    return this.userService.changePassword(data);
  }
}
