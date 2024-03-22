import { Component, OnInit } from '@angular/core';
import { Mixin } from 'ts-mixer';
import { FormBase } from '../../../shared/base/form-base';
import { ModalContentBase } from '../../../shared/base/modal-content-base';
import { UserService } from '../../user/user.service';
import { AuthorService } from '../author.service';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-author-create',
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
  templateUrl: './author-create.component.html',
  styleUrl: './author-create.component.scss',
})
export class AuthorCreateComponent
  extends Mixin(FormBase, ModalContentBase)
  implements OnInit
{
  constructor(private user: UserService, private author: AuthorService) {
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
      required: 'Tên tác giả không hợp lệ',
    },
  };

  submitForm() {
    if (this.formValid()) {
      this.author
        .createAuthor(this.removeBlankString(this.validateForm.value) as any)
        .pipe(this.httpErrorOperator('author'))
        .subscribe((res) => {
          this.destroyModal(res);
        });
    }
  }
}
