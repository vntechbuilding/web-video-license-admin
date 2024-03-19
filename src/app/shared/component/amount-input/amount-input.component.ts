import { Component, OnInit } from '@angular/core';
import { InputComponentBase } from '../../base/input-component.base';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorType } from '../../base/form-base';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'app-amount-input',
  standalone: true,
  imports: [
    NzFormModule,
    NzInputNumberModule,
    NzGridModule,
    ReactiveFormsModule,
  ],
  templateUrl: './amount-input.component.html',
  styleUrl: './amount-input.component.scss',
})
export class AmountInputComponent extends InputComponentBase implements OnInit {
  override validatorError: FormErrorType = {
    amount: {
      required: 'Amount is not valid',
      min: 'Amount must be greater than 1',
      pattern: 'Amount is not valid',
    },
  };
  ngOnInit() {
    this.addControl(
      'amount',
      this.setValidators(this.validators['amount'], [
        Validators.required,
        Validators.min(1),
        Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/),
      ])
    );
    this.emitNewErrorMsg('amount');
  }
}
