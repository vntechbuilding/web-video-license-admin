import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { FormErrorType } from './form-base';

export const InputComponentBaseInput = [
  'formGroup',
  'formErrors',
  'errorMsgGroup',
  'defaultValue',
  'validators',
  'formErrorMsg',
];
export const InputComponentBaseOutput = ['formErrorMsgChange'];
export const InputComponentBaseIO = {
  input: InputComponentBaseInput,
  output: InputComponentBaseOutput,
};
export declare type defaultValueType = {
  [key: string]: any;
};
export declare type validatorsType = {
  [key: string]: ValidatorFn | ValidatorFn[];
};
@Component({
  template: '',
})
export abstract class InputComponentBase implements ControlValueAccessor {
  @Input({ required: true }) public formGroup!: FormGroup;
  @Input({ required: true }) public formErrors: { [key: string]: string } = {};
  @Input() defaultValue: defaultValueType = {};
  @Input() validators: validatorsType = {};
  private _formErrorMsg: FormErrorType = {};
  @Input({ alias: 'formErrorMsg', required: true }) public set formErrorMsg(
    value: FormErrorType
  ) {
    // console.log(value);
    if (this._formErrorMsg != value && value) {
      this._formErrorMsg = value;
      this.formErrorMsgChange.next(value);
      this.formErrorMsgChange.next(value);
      // this.changeDetectorRef.detectChanges();
    }
  }

  addControl(
    name: string,
    validator: ValidatorFn | ValidatorFn[],
    defaultValue: any = '',
    defaultNull: boolean = false
  ) {
    const control = this.formGroup.get(name);
    if (control) {
      control.setValidators(validator);
    } else {
      this.formGroup.addControl(
        name,
        new FormControl(
          defaultNull ? null : this.defaultValue[name] || defaultValue,
          {
            validators: validator,
          }
        )
      );
    }
  }
  public get formErrorMsg() {
    return this._formErrorMsg;
  }

  validatorError: FormErrorType = {};
  public emitNewErrorMsg(controlName: string) {
    this.formErrorMsg = {
      ...this.formErrorMsg,
      ...{
        [controlName]: {
          ...(this.formErrorMsg[controlName] || {}),
          ...this.validatorError[controlName],
        },
      },
    };
  }

  setValidators(validator: ValidatorFn | ValidatorFn[], custom: ValidatorFn[]) {
    if (!validator) return custom;
    if (Array.isArray(validator)) validator.push(...custom);
    else validator = [validator, ...custom];
    return validator;
  }

  @Output() public formErrorMsgChange = new EventEmitter<FormErrorType>();

  public writeValue(obj: any): void {}
  public registerOnChange(fn: any): void {}
  public registerOnTouched(fn: any): void {}
  constructor() {}
}
