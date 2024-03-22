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
import { NzInputDirective, NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { InputComponentBase } from '../../base/input-component.base';
import { UserService } from '../../../pages/user/user.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-id-input',
  standalone: true,
  imports: [
    NzFormModule,
    NzSelectModule,
    NzGridModule,
    ReactiveFormsModule,
    NzInputModule,
    CommonModule,
  ],
  templateUrl: './user-id-input.component.html',
  styleUrl: './user-id-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserIdInputComponent),
      multi: true,
    },
  ],
})
export class UserIdInputComponent
  extends InputComponentBase
  implements OnInit, OnDestroy
{
  constructor(private user: UserService) {
    super();
  }

  user$ = this.user.getAllUser(9999);
  @Output('userId') userId = new EventEmitter<string>();
  @Input('allowClear') allowClear: boolean = false;
  useridSubscription!: Subscription;
  ngOnInit() {
    this.addControl('userId', this.validators['userId']);
    this.useridSubscription = this.formGroup
      .get('userId')
      ?.valueChanges.subscribe((value) =>
        this.userId.emit(value)
      ) as Subscription;
  }
  ngOnDestroy() {
    if (this.useridSubscription) this.useridSubscription.unsubscribe();
  }
}
