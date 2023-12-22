import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[pinMatch]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EqualValidatorDirective, multi: true }]
})
export class EqualValidatorDirective implements Validator {
  @Input('pin') pin!: string;

  validate(control: AbstractControl): ValidationErrors | null {
    const pinRepeat = control.value;

    if (pinRepeat !== this.pin) {
      return { pinMismatch: true };
    }

    return null;
  }
}
