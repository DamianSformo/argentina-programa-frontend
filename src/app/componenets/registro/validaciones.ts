import { AbstractControl } from "@angular/forms";

export class Validaciones{

  static mail(emails: string[]){
    return (control: AbstractControl) => {
      const value = control.value;
      if ( emails.includes(value)) {
          return {mail: true};
      }
      return null;
    }
  }
}