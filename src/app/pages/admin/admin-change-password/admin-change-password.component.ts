import { Component } from '@angular/core';
import { admin, AdminService } from '../admin.service';
import { Mixin } from 'ts-mixer';
import { FormBase } from '../../../shared/base/form-base';
import { ModalContentBase } from '../../../shared/base/modal-content-base';
import { ChangePasswordComponent } from '../../../shared/component/change-password/change-password.component';

@Component({
  selector: 'app-admin-change-password',
  standalone: true,
  imports: [ChangePasswordComponent],
  templateUrl: './admin-change-password.component.html',
  styleUrl: './admin-change-password.component.scss',
})
export class AdminChangePasswordComponent extends Mixin(
  FormBase,
  ModalContentBase<admin>
) {
  constructor(public adminService: AdminService) {
    super();
  }

  submit(data: any) {
    return this.adminService.changePassword(data);
  }
}
