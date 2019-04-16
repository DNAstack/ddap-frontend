import { Directive, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line
  selector: '[matAutocomplete]',
  exportAs: 'isFocused',
})
export class FocusedDirective {

  isFocused = false;

  constructor() {

  }

  @HostListener('focus') onFocus() {
    this.isFocused = true;
  }

  @HostListener('blur') onBlur() {
    this.isFocused = false;
  }
}
