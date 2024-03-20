import { Component, OnDestroy, OnInit } from '@angular/core';
import { Mixin } from 'ts-mixer';
import { ModalBase } from '../../../shared/base/modal-base';
import {
  debounceTime,
  Observable,
  ReplaySubject,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { user, UserService } from '../../user/user.service';
import { UserCreateComponent } from '../../user/user-create/user-create.component';
import { UserChangePasswordComponent } from '../../user/user-change-password/user-change-password.component';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { AutoUnsubscribe } from '../../../shared/decorators/auto-unsubscribe';

@Component({
  selector: 'app-user-index',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzPopconfirmModule,
    NzButtonModule,
    NzIconModule,
    NzToolTipModule,
    NzSwitchModule,
    FormsModule,
  ],
  templateUrl: './user-index.component.html',
  styleUrl: './user-index.component.scss',
})
@AutoUnsubscribe()
export class UserIndexComponent
  extends Mixin(ModalBase)
  implements OnInit, OnDestroy
{
  pageSize: number = 10;
  pageIndex: number = 0;
  total: number = 0;
  userLoad$: ReplaySubject<boolean> = new ReplaySubject(1);
  user$: Observable<{ data: user[]; count: number }> = this.userLoad$
    .pipe(
      debounceTime(100),
      switchMap(() =>
        this.userService.getAllUser(this.pageSize, this.pageIndex)
      )
    )
    .pipe(
      tap((data) => {
        this.total = data.count;
      })
    );
  constructor(private userService: UserService) {
    super();
  }
  ngOnInit() {
    this.userLoad$.next(true);
  }
  changePage($event: number) {
    this.pageIndex = $event - 1;
    this.userLoad$.next(true);
  }
  ngOnDestroy() {}

  update(data: user) {}

  delete(data: user) {
    this.userService.deleteUser(data.id).subscribe({
      complete: () => {
        this.userLoad$.next(true);
      },
    });
  }

  createModalSubscription$!: Subscription;
  create() {
    const modal = this.createComponentModal<UserCreateComponent, {}>(
      {
        nzTitle: 'Tạo tài khoản người dùng',
      },
      UserCreateComponent
    );
    this.createModalSubscription$ = modal.afterClose.subscribe((data: user) => {
      if (data && data.id) this.userLoad$.next(true);
    });
  }

  changeDisabledSubscription$!: Subscription;
  changeDisabled(data: user, disabled: boolean) {
    this.changeDisabledSubscription$ = this.userService
      .updateDisabled({
        id: data.id,
        disabled: disabled,
      })
      .subscribe((data) => {
        this.userLoad$.next(true);
      });
  }

  changePassword(data: user) {
    this.createComponentModal(
      {
        nzTitle: 'Đổi mật khẩu tài khoản  người dùng ' + data.fullName,
      },
      UserChangePasswordComponent,
      data
    );
  }
}
