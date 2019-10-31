import { Component, Input } from '@angular/core';

@Component({
  selector: 'ddaplib-form-footer-error',
  templateUrl: './form-footer-error.component.html',
  styleUrls: ['./form-footer-error.component.scss'],
})
export class FormFooterErrorComponent {

  @Input()
  showError = false;
  @Input()
  message: string;

}
