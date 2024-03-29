import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { InputComponentBase } from '../../base/input-component.base';

@Component({
  selector: 'app-disabled-input',
  standalone: true,
  imports: [NzFormModule, NzSwitchModule, NzGridModule, ReactiveFormsModule],
  templateUrl: './disabled-input.component.html',
  styleUrl: './disabled-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DisabledInputComponent),
      multi: true,
    },
  ],
})
export class DisabledInputComponent
  extends InputComponentBase
  implements OnInit
{
  @Input({ required: false }) public label: string = 'Khoá tài khoản';
  //Khoá tài khoản
  ngOnInit() {
    this.addControl('disabled', this.validators['disabled']);
  }
}
