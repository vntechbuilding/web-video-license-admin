import { Component, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { DisabledInputComponent } from '../../../shared/component/disabled-input/disabled-input.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { Mixin } from 'ts-mixer';
import { FormBase } from '../../../shared/base/form-base';
import { ModalContentBase } from '../../../shared/base/modal-content-base';
import { UserService } from '../../user/user.service';
import { DomainService, domain } from '../domain.service';

@Component({
  selector: 'app-domain-edit',
  standalone: true,
  imports: [
    NzFormModule,
    NzGridModule,
    NzButtonModule,
    NzInputModule,
    ReactiveFormsModule,
    DisabledInputComponent,
    NzSelectModule,
    CommonModule,
  ],
  templateUrl: './domain-edit.component.html',
  styleUrl: './domain-edit.component.scss',
})
export class DomainEditComponent
  extends Mixin(FormBase, ModalContentBase<domain>)
  implements OnInit
{
  constructor(private user: UserService, private domain: DomainService) {
    super();
  }
  user$ = this.user.getAllUser(1000);
  ngOnInit() {
    this.validateForm = this.fb.group({
      domain: [
        {
          value: this.nzModalData.domain,
          disabled: true,
        },
        [Validators.required],
      ],
      userId: [this.nzModalData.userId, [Validators.required]],
      disabled: [this.nzModalData.disabled],
    });
  }

  override _formErrorMsg = {
    domain: {
      required: 'Domain không được để trống',
    },
    userId: {
      required: 'User không được để trống',
    },
  };

  submitForm() {
    if (this.formValid()) {
      this.domain
        .updateDomain(
          this.removeBlankString({
            ...this.validateForm.value,
            id: this.nzModalData.id,
          }) as any
        )
        .pipe(this.httpErrorOperator('domain'))
        .subscribe((data) => {
          this.destroyModal(data);
        });
    }
  }
}
