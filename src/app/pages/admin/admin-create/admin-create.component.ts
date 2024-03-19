import { Component, OnInit } from '@angular/core';
import { FormBase } from '../../../shared/base/form-base';
import { Mixin } from 'ts-mixer';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import {
  PasswordConfirmForm,
  PasswordConfirmFormError,
  PasswordConfirmValidator,
} from '../../../shared/form/password-confirm.form';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { AdminService } from '../admin.service';
import { ModalContentBase } from '../../../shared/base/modal-content-base';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-create',
  standalone: true,
  imports: [
    NzFormModule,
    NzInputModule,
    NzGridModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzSwitchModule,
    CommonModule,
  ],
  templateUrl: './admin-create.component.html',
  styleUrl: './admin-create.component.scss',
})
export class AdminCreateComponent
  extends Mixin(FormBase, ModalContentBase)
  implements OnInit
{
  constructor(private adminService: AdminService) {
    super();
  }

  ngOnInit() {
    this.validateForm = this.fb.group(
      {
        username: [null, [Validators.required]],
        disabled: [false],
        ...PasswordConfirmForm,
      },
      { ...PasswordConfirmValidator }
    );
    // this.formValidationSub();
  }

  public override _formErrorMsg = {
    username: {
      required: 'Username is not valid',
    },
    ...PasswordConfirmFormError,
  };

  submitForm() {
    if (this.formValid()) {
      this.adminService
        .createAdmin(this.validateForm.value)
        .pipe(this.httpErrorOperator('username'))
        .subscribe((createData) => {
          this.destroyModal(createData);
        });
    }
  }
}
