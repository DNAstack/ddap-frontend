import { Component, Input } from '@angular/core';

@Component({
  selector: 'ddap-nav-back',
  templateUrl: './nav-back.component.html',
  styleUrls: ['./nav-back.component.scss'],
})
export class NavBackComponent {
  @Input()
  navigateTo: string;
}
