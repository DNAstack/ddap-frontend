import { Component, Input } from '@angular/core';

@Component({
  selector: 'ddaplib-header-btn',
  templateUrl: './header-btn.component.html',
  styleUrls: ['./header-btn.component.scss'],
})
export class HeaderBtnComponent {

  @Input()
  label: string;
  @Input()
  navigateTo: string[];
  @Input()
  dataSe: string; // For E2E purposes

}
