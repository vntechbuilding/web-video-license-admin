import { Component, OnInit } from '@angular/core';
import { AmountInputComponent } from '../../../shared/component/amount-input/amount-input.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Mixin } from 'ts-mixer';
import { FormBase } from '../../../shared/base/form-base';
import { ModalContentBase } from '../../../shared/base/modal-content-base';
import { user, userDeposit, UserService } from '../../user/user.service';

@Component({
  selector: 'app-user-withdraw',
  standalone: true,
  imports: [
    AmountInputComponent,
    NzFormModule,
    ReactiveFormsModule,
    NzGridModule,
    NzButtonModule,
  ],
  templateUrl: './user-withdraw.component.html',
  styleUrl: './user-withdraw.component.scss',
})
export class UserWithdrawComponent
  extends Mixin(FormBase, ModalContentBase<user>)
  implements OnInit
{
  constructor(private userService: UserService) {
    super();
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      amount: [1, [Validators.required]],
    });
  }
  override defaultValue: Partial<userDeposit> = {
    amount: 1,
  };

  submitForm() {
    if (this.formValid()) {
      this.userService
        .withdrawBalance({
          ...this.validateForm.value,
          id: this.nzModalData.id,
        })
        .pipe(this.httpErrorOperator('amount'))
        .subscribe((createData) => {
          this.destroyModal(createData);
        });
    }
  }
}
