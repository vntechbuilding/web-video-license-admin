import { Component, OnInit } from '@angular/core';
import { ModalContentBase } from '../../../shared/base/modal-content-base';
import { user, UserService } from '../../user/user.service';
import { debounceTime, ReplaySubject, switchMap, tap } from 'rxjs';
import { CommonModule, DecimalPipe } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-user-transaction-history',
  standalone: true,
  imports: [CommonModule, NzTableModule, DecimalPipe],
  templateUrl: './user-transaction-history.component.html',
  styleUrl: './user-transaction-history.component.scss',
})
export class UserTransactionHistoryComponent
  extends ModalContentBase<user>
  implements OnInit
{
  pageSize: number = 10;
  pageIndex: number = 0;
  total: number = 0;
  userTransactionLoad$: ReplaySubject<boolean> = new ReplaySubject(1);
  userTransaction$ = this.userTransactionLoad$
    .pipe(
      debounceTime(100),
      switchMap(() =>
        this.userService.transactionHistory(
          this.nzModalData.id,
          this.pageSize,
          this.pageIndex
        )
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
    this.userTransactionLoad$.next(true);
  }

  changePage($event: number) {
    this.pageIndex = $event - 1;
    this.userTransactionLoad$.next(true);
  }
}
