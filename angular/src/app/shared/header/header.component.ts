import { Component, Input } from '@angular/core';

@Component({
  selector: 'ddap-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @Input()
  label: string;

  @Input()
  icon: string = null;

  @Input()
  backLink: any = null;

}
