import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { InputComponentBase } from '../../base/input-component.base';
import { ReplaySubject, Subject, Subscription, switchMap } from 'rxjs';
import { DomainService } from '../../../pages/domain/domain.service';

@Component({
  selector: 'app-domain-input-by-user',
  standalone: true,
  imports: [
    NzFormModule,
    NzSelectModule,
    NzGridModule,
    ReactiveFormsModule,
    NzInputModule,
    CommonModule,
  ],
  templateUrl: './domain-input-by-user.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DomainInputByUserComponent),
      multi: true,
    },
  ],
  styleUrl: './domain-input-by-user.component.scss',
})
export class DomainInputByUserComponent
  extends InputComponentBase
  implements OnInit, OnDestroy
{
  constructor(private domainService: DomainService) {
    super();
  }

  loadData$ = new ReplaySubject<string>();
  domain$ = this.loadData$.pipe(
    switchMap((userId) => {
      // console.log(userId);
      if (!userId) return [];
      return this.domainService.allUserDomain(userId);
    })
  );
  @Output('domainId') domainId = new EventEmitter<string>();
  @Input('allowClear') allowClear: boolean = false;
  domainIdSubscription!: Subscription;
  userIdSubscription!: Subscription;
  ngOnInit() {
    this.addControl(
      'domainId',
      this.validators['domainId'],
      this.defaultValue['domainId']
    );
    if (this.defaultValue['userId']) {
      this.loadData$.next(this.defaultValue['userId']);
    }
    this.domainIdSubscription = this.formGroup
      .get('domainId')
      ?.valueChanges.subscribe((value) =>
        this.domainId.emit(value)
      ) as Subscription;
    this.userIdSubscription = this.formGroup
      .get('userId')
      ?.valueChanges.subscribe((value) => {
        this.loadData$.next(value);
      }) as Subscription;
  }
  ngOnDestroy() {
    if (this.domainIdSubscription) this.domainIdSubscription.unsubscribe();
    if (this.userIdSubscription) this.userIdSubscription.unsubscribe();
  }
}
