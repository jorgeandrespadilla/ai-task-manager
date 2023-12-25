import { AbstractControl, FormArray } from "@angular/forms";

type ErrorMessages = Record<string, (data: any) => string>;

const FORM_ERROR_MESSAGES: ErrorMessages = {
  'required': _data => 'Este campo es requerido',
  'minlength': data => `Este campo debe tener al menos ${data.requiredLength} caracteres`,
  'maxlength': data => `Este campo debe tener como máximo ${data.requiredLength} caracteres`,
  'min': data => `El valor mínimo es ${data.min}`,
};

export class FormUtils {

  public static hasFieldError(form: AbstractControl, field: string, errorType: string): boolean {
    return Boolean(form.get(field)?.touched) && Boolean(form.get(field)?.hasError(errorType));
  }

  public static hasFieldErrors(form: AbstractControl, field: string): boolean {
    return Boolean(form.get(field)?.touched) && Boolean(form.get(field)?.invalid);
  }

  public static hasFieldErrorsInArray(formArray: FormArray, index: number): boolean {
    return formArray.controls[index].touched && Boolean(formArray.controls[index].invalid);
  }

  public static getFieldError(form: AbstractControl, field: string, errorType: string): string | null {
    if (!this.hasFieldError(form, field, errorType)) return null;
    const error = form.get(field)?.errors?.[errorType];
    return FORM_ERROR_MESSAGES[errorType](error);
  }

  public static getFirstFieldError(form: AbstractControl, field: string): string | null {
    const errors = this.getFieldErrors(form, field);
    if (errors.length === 0) return null;
    return errors[0] ?? null;
  }

  private static getFieldErrors(form: AbstractControl, field: string): string[] {
    const errors = form.get(field)?.errors;
    if (!errors) return [];
    return Object
      .entries(errors)
      .map(([error, data]) => FORM_ERROR_MESSAGES[error](data))
      .filter(error => error !== null);
  }

}
