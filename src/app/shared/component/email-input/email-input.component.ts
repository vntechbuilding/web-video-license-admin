import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import {
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponentBase } from '../../base/input-component.base';
import { FormErrorType } from '../../base/form-base';

@Component({
  selector: 'app-email-input',
  standalone: true,
  imports: [NzFormModule, NzInputModule, NzGridModule, ReactiveFormsModule],
  templateUrl: './email-input.component.html',
  styleUrl: './email-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailInputComponent),
      multi: true,
    },
  ],
})
export class EmailInputComponent extends InputComponentBase implements OnInit {
  ngOnInit() {
    this.addControl(
      'email',
      this.setValidators(this.validators['email'], [Validators.email])
      // this.validators['disabled']
    );
    this.emitNewErrorMsg('email');
  }
  override validatorError: FormErrorType = {
    email: {
      email: 'Email is not valid',
    },
  };
}
