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
  isSearchPage = false;

  @Input()
  backLink: any = null;

  @Input()
  searchButton = true;

  @Input()
  searchOpen = false;

  constructor() {
  }

  closeSearch() {
    this.searchOpen = false;
  }

  openSearch() {
    this.searchOpen = true;
  }
}
