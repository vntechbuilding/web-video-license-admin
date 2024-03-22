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
import { PublisherService } from '../../../pages/publisher/publisher.service';

@Component({
  selector: 'app-publisher-input-by-user',
  standalone: true,
  imports: [
    NzFormModule,
    NzSelectModule,
    NzGridModule,
    ReactiveFormsModule,
    NzInputModule,
    CommonModule,
  ],
  templateUrl: './publisher-input-by-user.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PublisherInputByUserComponent),
      multi: true,
    },
  ],
  styleUrl: './publisher-input-by-user.component.scss',
})
export class PublisherInputByUserComponent
  extends InputComponentBase
  implements OnInit, OnDestroy
{
  constructor(private publisherService: PublisherService) {
    super();
  }

  loadData$ = new ReplaySubject<string>();
  publisher$ = this.loadData$.pipe(
    switchMap((userId) => {
      if (!userId) return [];
      return this.publisherService.getAllUserPublisher(userId, 99999);
    })
  );
  @Output('publisherId') publisherId = new EventEmitter<string>();
  @Input('allowClear') allowClear: boolean = false;
  publisherIdSubscription!: Subscription;
  userIdSubscription!: Subscription;
  ngOnInit() {
    this.addControl(
      'publisherId',
      this.validators['publisherId'],
      this.defaultValue['publisherId']
    );
    this.publisherIdSubscription = this.formGroup
      .get('domainId')
      ?.valueChanges.subscribe((value) =>
        this.publisherId.emit(value)
      ) as Subscription;
    this.userIdSubscription = this.formGroup
      .get('userId')
      ?.valueChanges.subscribe((value) => {
        this.loadData$.next(value);
      }) as Subscription;
    if (this.defaultValue['userId']) {
      this.loadData$.next(this.defaultValue['userId']);
    }
  }
  ngOnDestroy() {
    if (this.publisherIdSubscription)
      this.publisherIdSubscription.unsubscribe();
    if (this.userIdSubscription) this.userIdSubscription.unsubscribe();
  }
}
