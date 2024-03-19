import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export const ConfirmedValidator = (
  controlName: string,
  matchingControlName: string
) => {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (
      matchingControl.errors &&
      !matchingControl.errors['confirmedValidator']
    ) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
};
export class ConfirmedValidatorClass {
  static confirmed = (controlName: string, matchingControlName: string) => {
    return (control: AbstractControl): ValidationErrors | null => {
      const input = control.get(controlName);
      const matchingInput = control.get(matchingControlName);
      if (!input || !matchingInput) return null;
      if (matchingInput.errors && !matchingInput.errors['confirmedValidator']) {
        return null;
      }
      if (input.value !== matchingInput.value) {
        matchingInput.setErrors({ confirmedValidator: true });
        return { confirmedValidator: true };
      } else {
        matchingInput.setErrors(null);
        return null;
      }
    };
  };
}
