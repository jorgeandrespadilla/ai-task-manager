import { AbstractControl, ValidatorFn } from '@angular/forms';

export interface BooleanFn {
  (control: AbstractControl): boolean;
}

/**
 * A conditional validator generator. Assigns a validator to the form control if the predicate function returns true on the moment of validation.
 * Here if the myCheckbox is set to true, the myEmailField will be required and also the text will have to have the word 'mason' in the end.
 * If it doesn't satisfy these requirements, the errors will placed to the dedicated `illuminatiError` namespace.
 * Also the myEmailField will always have `maxLength`, `minLength` and `pattern` validators.
 * @example
 * ngOnInit() {
 *   this.myForm = this.fb.group({
 *     myCheckbox: [''],
 *     myEmailField: ['', [
 *       Validators.maxLength(250),
 *       Validators.minLength(5),
 *       Validators.pattern(/.+@.+\..+/),
 *       conditionalValidator(control => control.get('myCheckbox').value,
 *         Validators.compose([
 *           Validators.required,
 *           Validators.pattern(/.*mason/)
 *         ]),
 *         'emailConditionalError'
 *       ]]
 *     })
 * }
 * @param predicate
 * @param validator
 * @param errorNamespace optional argument that creates own namespace for the validation error
 */
export function conditionalValidator(predicate: BooleanFn, validator: ValidatorFn, errorNamespace?: string): ValidatorFn {
  return ((control: AbstractControl) => {
    if (!control.parent) {
      return null;
    }
    let error = null;
    if (predicate(control.parent)) {
      error = validator(control);
    }
    if (errorNamespace && error) {
      const customError: { [key: string]: any } = {};
      customError[errorNamespace] = error;
      error = customError;
    }
    return error;
  });
}
