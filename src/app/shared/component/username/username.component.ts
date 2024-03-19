import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import {
  InputComponentBase,
  InputComponentBaseIO,
} from '../../base/input-component.base';
import { FormErrorType } from '../../base/form-base';

@Component({
  selector: 'app-username',
  standalone: true,
  imports: [NzFormModule, NzInputModule, NzGridModule, ReactiveFormsModule],
  templateUrl: './username.component.html',
  styleUrl: './username.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsernameComponent),
      multi: true,
    },
  ],
  ...InputComponentBaseIO,
})
export class UsernameComponent extends InputComponentBase implements OnInit {
  override validatorError: FormErrorType = {
    username: {
      required: 'Username is not valid',
    },
  };

  private usernameValidator = [Validators.required];

  ngOnInit() {
    this.addControl(
      'username',
      this.setValidators(this.validators['username'], this.usernameValidator)
    );
    this.emitNewErrorMsg('username');
  }
}
