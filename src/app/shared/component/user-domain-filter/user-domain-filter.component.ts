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
import { debounceTime, of, Subject, Subscription, switchMap } from 'rxjs';
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
  constructor(private user: UserService, private domain: DomainService) {
    super();
  }
  user$ = this.user.getAllUser(1000);
  loadDomain$ = new Subject<string>();
  domain$ = this.loadDomain$.pipe(
    switchMap((userId) => {
      this.validateForm.get('domainId')?.setValue('');
      if (!userId) {
        return of([]);
      }
      return this.domain.allUserDomain(userId);
    })
  );

  valueSubscription!: Subscription;
  ngOnInit() {
    this.validateForm = this.fb.group({
      domainId: [''],
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
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    if (this.valueSubscription) this.valueSubscription.unsubscribe();
  }
}
