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
import { UserService } from '../../user/user.service';
import { publisher, PublisherService } from '../publisher.service';

@Component({
  selector: 'app-publisher-edit',
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
  templateUrl: './publisher-edit.component.html',
  styleUrl: './publisher-edit.component.scss',
})
export class PublisherEditComponent
  extends Mixin(FormBase, ModalContentBase<publisher>)
  implements OnInit
{
  constructor(private user: UserService, private publisher: PublisherService) {
    super();
  }
  user$ = this.user.getAllUser(9999);
  ngOnInit() {
    this.validateForm = this.fb.group({
      userId: [this.nzModalData.userId, [Validators.required]],
      name: [this.nzModalData.name, [Validators.required]],
      description: [this.nzModalData.description],
      url: [this.nzModalData.url],
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
        .updatePublisher({
          ...(this.removeBlankString(this.validateForm.value) as any),
          publisherId: this.nzModalData.id,
        })
        .pipe(this.httpErrorOperator('publisher'))
        .subscribe((res) => {
          this.destroyModal(res);
        });
    }
  }
}
