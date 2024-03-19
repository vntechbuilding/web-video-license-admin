import { Component, OnDestroy, OnInit } from '@angular/core';
import { admin, AdminService } from '../admin.service';
import {
  debounceTime,
  Observable,
  ReplaySubject,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  AsyncPipe,
  CommonModule,
  DatePipe,
  JsonPipe,
  NgForOf,
  NgIf,
} from '@angular/common';
import { ModalBase } from '../../../shared/base/modal-base';
import { Mixin } from 'ts-mixer';
import { AdminCreateComponent } from '../admin-create/admin-create.component';
import { AutoUnsubscribe } from '../../../shared/decorators/auto-unsubscribe';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AdminChangePasswordComponent } from '../admin-change-password/admin-change-password.component';
@Component({
  selector: 'app-admin-index',
  standalone: true,
  imports: [
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    AsyncPipe,
    NgIf,
    JsonPipe,
    DatePipe,
    NzPopconfirmModule,
    NzSwitchModule,
    FormsModule,
    CommonModule,
    NzToolTipModule,
  ],
  providers: [AdminService],
  templateUrl: './admin-index.component.html',
  styleUrl: './admin-index.component.scss',
})
@AutoUnsubscribe()
export class AdminIndexComponent
  extends Mixin(ModalBase)
  implements OnInit, OnDestroy
{
  pageSize: number = 10;
  pageIndex: number = 0;
  totalAdmin: number = 0;
  adminLoad$: ReplaySubject<boolean> = new ReplaySubject(1);
  admin$: Observable<{ admin: admin[]; count: number }> = this.adminLoad$
    .pipe(
      debounceTime(100),
      switchMap(() =>
        this.adminService.getAllAdmin(this.pageSize, this.pageIndex)
      )
    )
    .pipe(
      tap((data) => {
        this.totalAdmin = data.count;
      })
    );
  constructor(private adminService: AdminService) {
    super();
  }
  ngOnInit() {
    this.adminLoad$.next(true);
  }
  changePage($event: number) {
    this.pageIndex = $event - 1;
    this.adminLoad$.next(true);
  }
  ngOnDestroy() {}

  update(data: admin) {}

  delete(data: admin) {
    this.adminService.deleteAdmin(data.id).subscribe({
      complete: () => {
        this.adminLoad$.next(true);
      },
    });
  }

  createModalSubscription$!: Subscription;
  create() {
    const modal = this.createComponentModal<AdminCreateComponent, {}>(
      {
        nzTitle: 'Tạo tài khoản Admin',
      },
      AdminCreateComponent
    );
    this.createModalSubscription$ = modal.afterClose.subscribe(
      (data: admin) => {
        if (data && data.id) this.adminLoad$.next(true);
      }
    );
  }

  changeDisabled(data: admin, disabled: boolean) {
    this.adminService
      .updateAdmin({
        id: data.id,
        disabled: disabled,
      })
      .subscribe((data) => {
        this.adminLoad$.next(true);
      });
  }

  changePassword(data: admin) {
    this.createComponentModal(
      {
        nzTitle: 'Đổi mật khẩu tài khoản ' + data.username,
      },
      AdminChangePasswordComponent,
      data
    );
  }
}
