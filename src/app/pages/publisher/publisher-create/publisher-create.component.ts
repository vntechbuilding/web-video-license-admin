import { Component, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { Mixin } from 'ts-mixer';
import { FormBase } from '../../../shared/base/form-base';
import { ModalContentBase } from '../../../shared/base/modal-content-base';
import { publisher, PublisherService } from '../publisher.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-publisher-create',
  standalone: true,
  imports: [
    NzFormModule,
    NzGridModule,
    NzButtonModule,
    NzInputModule,
    ReactiveFormsModule,
    NzSelectModule,
    CommonModule,
  ],
  templateUrl: './publisher-create.component.html',
  styleUrl: './publisher-create.component.scss',
})
export class PublisherCreateComponent
  extends Mixin(FormBase, ModalContentBase)
  implements OnInit
{
  constructor(private user: UserService, private publisher: PublisherService) {
    super();
  }
  user$ = this.user.getAllUser(9999);
  ngOnInit() {
    this.validateForm = this.fb.group({
      userId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: [''],
      url: [''],
    });
  }

  override _formErrorMsg = {
    userId: {
      required: 'User không được để trống',
    },
    name: {
      required: 'Tên publisher không hợp lệ',
    },
  };

  submitForm() {
    if (this.formValid()) {
      this.publisher
        .createPublisher(this.removeBlankString(this.validateForm.value) as any)
        .pipe(this.httpErrorOperator('publisher'))
        .subscribe((res) => {
          this.destroyModal(res);
        });
    }
  }
}
