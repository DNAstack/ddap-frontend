import { Component, Input } from '@angular/core';

@Component({
  selector: 'ddaplib-header-add-btn',
  templateUrl: './header-add-btn.component.html',
  styleUrls: ['./header-add-btn.component.scss'],
})
export class HeaderAddBtnComponent {

  @Input()
  label: string;
  @Input()
  navigateTo: string[];

}
