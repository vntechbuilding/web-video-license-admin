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
import { InputComponentBase } from '../../base/input-component.base';

@Component({
  selector: 'app-fullname-input',
  standalone: true,
  imports: [NzFormModule, NzInputModule, NzGridModule, ReactiveFormsModule],
  templateUrl: './fullname-input.component.html',
  styleUrl: './fullname-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FullnameInputComponent),
      multi: true,
    },
  ],
})
export class FullnameInputComponent
  extends InputComponentBase
  implements OnInit
{
  ngOnInit() {
    // this.formGroup.addControl(
    //   'fullname',
    //   new FormControl(
    //     this.defaultValue['fullname'] || '',
    //     this.setValidators(this.validators['fullname'], [Validators.required])
    //   )
    // );
    this.addControl(
      'fullName',
      this.setValidators(this.validators['fullName'], [Validators.required])
      // this.validators['disabled']
    );
    this.emitNewErrorMsg('fullName');
  }
  override validatorError = {
    fullName: {
      required: 'FullName is required',
    },
  };
}
