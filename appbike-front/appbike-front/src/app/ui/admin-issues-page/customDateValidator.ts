import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateNotLaterThanTodayValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let selectedDate = control.value;

    if (selectedDate == null) {
      // Handle cases where no date is selected (e.g., empty input)
      return null;
    }
    selectedDate =  DateObjectToDUsableDate(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison

    if (selectedDate < today) {
      return { laterThanToday: true };
    }

    return null;
  };
}

function DateObjectToDUsableDate(crapDate :any){
  return new Date(crapDate.year, crapDate.month - 1, crapDate.day);
}
