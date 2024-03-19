import { Component, Input, OnInit } from '@angular/core';
import { Mixin } from 'ts-mixer';
import { FormBase } from '../../base/form-base';
import { ModalContentBase } from '../../base/modal-content-base';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordConfirmComponent } from '../password-confirm/password-confirm.component';
import { PasswordConfirmForm } from '../../form/password-confirm.form';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule,
    ReactiveFormsModule,
    PasswordConfirmComponent,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent
  extends Mixin(FormBase, ModalContentBase<any>)
  implements OnInit
{
  constructor() {
    super();
  }

  ngOnInit() {
    this.validateForm = this.fb.group(PasswordConfirmForm, {});
  }

  @Input() submitFunc!: Function;
  submitForm() {
    if (this.formValid()) {
      this.submitFunc({ ...this.validateForm.value, id: this.nzModalData.id })
        .pipe(this.httpErrorOperator('password'))
        .subscribe((changePassword: any) => {
          this.notification.success(
            'Success',
            'Đổi mật khẩu tài khoản ' +
              this.nzModalData.username +
              ' thành công'
          );
          this.destroyModal(changePassword);
        });
    }
  }
}
