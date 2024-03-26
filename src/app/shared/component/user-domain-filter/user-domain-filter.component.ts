import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBase } from '../../base/form-base';
import { UserService } from '../../../pages/user/user.service';
import { DomainService } from '../../../pages/domain/domain.service';
import {
  debounceTime,
  of,
  ReplaySubject,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
export declare type UserDomainFilter = {
  userId: string;
  domainId: string;
};
@Component({
  selector: 'app-user-domain-filter',
  standalone: true,
  imports: [
    NzFormModule,
    NzGridModule,
    NzInputModule,
    ReactiveFormsModule,
    NzSelectModule,
    CommonModule,
  ],
  templateUrl: './user-domain-filter.component.html',
  styleUrl: './user-domain-filter.component.scss',
})
export class UserDomainFilterComponent
  extends FormBase
  implements OnInit, OnDestroy
{
  @Output() filter = new EventEmitter<UserDomainFilter>();
  @Input('domainInput') public domainInput: boolean = true;
  @Input('domainId') public domainId!: string;
  @Input('firstUser') public firstUser: boolean = true;
  constructor(private user: UserService, private domain: DomainService) {
    super();
  }
  user$ = this.user.getAllUser(1000).pipe(
    tap((users) => {
      if (this.firstUser && users.data.length > 0) {
        this.validateForm.get('userId')?.setValue(users.data[0]?.id);
      }
    })
  );
  loadDomain$ = new ReplaySubject<string>();
  domain$ = this.loadDomain$.pipe(
    switchMap((userId) => {
      // this.validateForm.get('domainId')?.setValue('');
      if (!userId) {
        return of([]);
      }
      return this.domain.allUserDomain(userId).pipe(
        tap((listDomain) => {
          const value = this.validateForm.get('domainId')?.value;
          if (value && !listDomain.find((d) => d.id === value)) {
            this.validateForm.get('domainId')?.setValue('');
          } else if (
            this.domainId &&
            listDomain.find((d) => d.id === this.domainId)
          ) {
            this.validateForm.get('domainId')?.setValue(this.domainId);
          }
          this.filter.next(this.validateForm.value);
        })
      );
    })
  );

  valueSubscription!: Subscription;
  ngOnInit() {
    // console.log(this.domainId);
    this.validateForm = this.fb.group({
      domainId: [this.domainId],
      userId: [''],
    });
    let lastValue: UserDomainFilter;
    this.valueSubscription = this.validateForm.valueChanges
      .pipe(debounceTime(100))
      .subscribe((value) => {
        if (JSON.stringify(value) === JSON.stringify(lastValue)) return;
        if (!lastValue || lastValue.userId !== value.userId)
          this.loadDomain$.next(value.userId);
        lastValue = value;
        this.filter.next(value);
      });
    if (this.domainId) {
      lastValue = this.validateForm.value;
      this.filter.next(lastValue);
    }
    if (this.defaultValue['userId']) {
      this.loadDomain$.next(this.defaultValue['userId']);
    }
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    if (this.valueSubscription) this.valueSubscription.unsubscribe();
  }
}
