import { Component, Input } from '@angular/core';

@Component({
  selector: 'ddap-header-btn',
  templateUrl: './header-btn.component.html',
  styleUrls: ['./header-btn.component.scss'],
})
export class HeaderBtnComponent {

  @Input()
  label: string;
  @Input()
  navigateTo: string[];

  constructor() { }

}
