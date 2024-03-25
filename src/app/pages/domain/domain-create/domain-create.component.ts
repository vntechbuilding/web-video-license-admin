import { Component, OnInit } from '@angular/core';
import { Mixin } from 'ts-mixer';
import { FormBase } from '../../../shared/base/form-base';
import { ModalContentBase } from '../../../shared/base/modal-content-base';
import { UserService } from '../../user/user.service';
import { DomainService } from '../domain.service';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { DisabledInputComponent } from '../../../shared/component/disabled-input/disabled-input.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';

@Component({
  selector: 'app-domain-create',
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
    NzSwitchComponent,
  ],
  templateUrl: './domain-create.component.html',
  styleUrl: './domain-create.component.scss',
})
export class DomainCreateComponent
  extends Mixin(FormBase, ModalContentBase)
  implements OnInit
{
  constructor(private user: UserService, private domain: DomainService) {
    super();
  }
  user$ = this.user.getAllUser(1000);
  ngOnInit() {
    this.validateForm = this.fb.group({
      domain: ['', [Validators.required]],
      https: [true, [Validators.required]],
      userId: ['', [Validators.required]],
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
        .createDomain(this.removeBlankString(this.validateForm.value) as any)
        .pipe(this.httpErrorOperator('domain'))
        .subscribe((data) => {
          this.destroyModal(data);
        });
    }
  }
}
