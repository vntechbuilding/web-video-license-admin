import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private notification: NotificationService) { }

  markAsDirty(form: UntypedFormGroup){
    Object.values(form.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  setError(err: HttpErrorResponse,errorsData: any, form: UntypedFormGroup){
    if(err.status == 400){
      if(err.error && err.error.message){
        const errors: Array<{
          property: string,
          value: string,
          message: string;
        }> = err.error.message;
        if(errors && Array.isArray(errors)){
          errors.forEach(error=>{
            const errorControl: any = form.controls[error.property];
            if(errorControl){
              errorsData[error.property] = error.message;
              // console.log(errorControl)
              errorControl.markAsDirty();
              errorControl.markAsTouched();
              errorControl.setErrors({
                error: error.message,
                info: 'incorrect'
              }, 1)
            }
          })
        }else{
          // this.no
          this.notification.unknownError();
        }
        // form.
        return errorsData;
      }
    }
    return errorsData;
  }
}
