import { ChangeDetectorRef, inject, Input, OnDestroy } from '@angular/core';

import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import {
  catchError,
  concat,
  debounceTime,
  map,
  Observable,
  of,
  Subscription,
  throwError,
} from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { AutoUnsubscribe } from '../decorators/auto-unsubscribe';
import { defaultValueType, validatorsType } from './input-component.base';
export declare type FormErrorType = {
  [formName: string]: {
    [errCode: string]: string;
  };
};
@AutoUnsubscribe()
export abstract class FormBase implements OnDestroy {
  readonly fb = inject(UntypedFormBuilder);
  readonly notification = inject(NotificationService);
  readonly cdr = inject(ChangeDetectorRef);
  private _validateForm!: UntypedFormGroup;
  public set validateForm(form: UntypedFormGroup) {
    this._validateForm = form;
    this.formValidationSubAuto();
  }
  public get validateForm(): UntypedFormGroup {
    return this._validateForm;
  }
  public formErrors: { [key: string]: string } = {};
  // public defaultErrors: { [key: string]: string } = {};
  // public formErrorMsg: FormErrorType = {};

  public _formErrorMsg: FormErrorType = {};
  public set formErrorMsg(value: FormErrorType) {
    // console.log(value);
    if (this._formErrorMsg != value) {
      this._formErrorMsg = value;
      this.cdr.detectChanges();
      // this.changeDetectorRef.detectChanges();
    }
  }
  public get formErrorMsg() {
    return this._formErrorMsg;
  }

  public formSuccess: boolean = false;
  public defaultValue: defaultValueType = {};
  public validators: validatorsType = {};
  ngOnDestroy() {}

  formValidation$!: Subscription;
  formValidationSubAuto() {
    this.formValidation$ = concat(
      this.validateForm.valueChanges,
      this.validateForm.statusChanges
    )
      .pipe(debounceTime(300))
      .subscribe(() => {
        Object.keys(this.validateForm.controls).forEach((key) => {
          const control = this.validateForm.get(key) as AbstractControl;
          const controlErrors = control.errors as ValidationErrors;
          // console.log(
          //   key,
          //   controlErrors,
          //   'dirty',
          //   control.dirty,
          //   'touched',
          //   control.touched
          // );
          if (controlErrors != null && control.dirty) {
            // && control.touched
            // console.log(this.formErrorMsg, key, Object.keys(controlErrors)[0]);
            this.formErrors[key] = this.formErrorMsg[key]
              ? this.formErrorMsg[key][Object.keys(controlErrors)[0]] ||
                'Data is not valid'
              : 'Data is not valid';
          }
        });
      });
  }

  public getFormError(formName: string) {
    const errorControl = this.validateForm.get(formName);
    if (!errorControl) {
      return of(false);
    } else {
      // errorControl.
      return errorControl.valueChanges.pipe(
        debounceTime(200),
        map((_) => {
          if (
            (errorControl.dirty || errorControl.touched) &&
            errorControl.errors
          ) {
            if (this.formErrorMsg[formName]) {
              const errorKey = Object.keys(errorControl.errors)[0];
              // console.log(
              //   this.formErrorMsg[formName],
              //   errorControl.errors,
              //   errorKey
              // );
              return (
                this.formErrorMsg[formName][errorKey] ||
                this.formErrors[formName] ||
                'Dữ liệu không hợp lệ'
              );
            } else {
              return this.formErrors[formName];
            }
          } else {
            return false;
          }
        })
      );
    }
  }

  public formValid() {
    if (this.validateForm.valid) {
      return true;
    } else {
      this.markAsDirty();
      return false;
    }
  }

  public markAsDirty() {
    Object.values(this.validateForm.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.markAllAsTouched();
        control.updateValueAndValidity({ onlySelf: true, emitEvent: true });
      }
    });
  }
  public markControlDirty(control: AbstractControl) {
    control.markAsDirty();
    control.markAllAsTouched();
    control.updateValueAndValidity({ onlySelf: true, emitEvent: true });
  }

  public removeBlankString(value: { [key: string]: any }) {
    let rs: { [key: string]: any } = {};
    for (const k in value) {
      if (value[k] !== '') rs[k] = value[k];
    }
    return rs;
  }

  // setError() {
  //
  // }

  httpErrorOperator<T>(
    defaultErrorField?: string
  ): (source$: Observable<T>) => Observable<T> {
    return (source$: Observable<T>) => {
      return source$.pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 400) {
            this.setHttpError(err, defaultErrorField);
          } else if (err.status === 500) this.notification.httpError(err, true);
          return throwError(() => err);
        })
      );
    };
  }

  /**
   * Lấy lỗi từ http request trả về gán vào control
   * @param err
   * @param defaultErrorField tên control dùng để set error
   */
  setHttpError(err: HttpErrorResponse, defaultErrorField?: string) {
    if (err.status === 400) {
      const errors: Array<{
        property: string;
        value: string;
        errors: [
          {
            [key: string]: string;
          }
        ];
        code: string;
        message: string;
      }> = err.error.message as any;
      if (errors && Array.isArray(errors) && errors.length) {
        errors.forEach((error) => {
          let errorControl: AbstractControl =
            this.validateForm.controls[error.property];
          if (!errorControl && defaultErrorField) {
            errorControl = this.validateForm.controls[defaultErrorField];
          }
          if (errorControl) {
            this.setFormError(
              errorControl,
              error.property,
              error.code,
              error.message
            );
          }
        });
      } else {
        this.notification.unknownError();
      }
    }
  }

  public setFormError(
    errorControl: AbstractControl,
    controlName: string,
    code: string,
    msg: string
  ) {
    this.formErrors[controlName] = msg;
    this.addFormDefaultErr(controlName, code, msg);
    errorControl.markAsDirty();
    errorControl.markAsTouched();
    errorControl.updateValueAndValidity({
      onlySelf: true,
      emitEvent: true,
    });
    errorControl.setErrors(
      {
        [code]: true,
      },
      { emitEvent: true }
    );
  }

  public addFormDefaultErr(controlName: string, code: string, msg: string) {
    if (!this.formErrorMsg[controlName]) {
      this.formErrorMsg[controlName] = {};
    }
    this.formErrorMsg[controlName][code] = msg;
  }
}
