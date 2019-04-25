import { Directive, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line
  selector: '[matAutocomplete]',
  exportAs: 'ddapInputState',
})
export class FocusedDirective {

  isFocused = false;
  isTouched = false;

  constructor() {

  }

  @HostListener('focus') onFocus() {
    this.isTouched = true;
    this.isFocused = true;
  }

  @HostListener('blur') onBlur() {
    this.isFocused = false;
  }
}
