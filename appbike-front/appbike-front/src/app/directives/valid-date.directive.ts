import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { dateNotLaterThanTodayValidator } from "../ui/admin-issues-page/customDateValidator";

@Directive({
    selector:"[laterThanToday]",
    providers: [{provide: NG_VALIDATORS,
        useExisting: ValidDateDirective,
        multi: true
    }]
})
export class ValidDateDirective implements Validator{

    validate(control: AbstractControl): ValidationErrors | null {
        return dateNotLaterThanTodayValidator()(control);
    }
}