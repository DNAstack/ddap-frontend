import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  @Output()
  searchOpenChange = new EventEmitter<boolean>();

  constructor() {
  }

  closeSearch() {
    this.searchOpen = false;
    this.searchOpenChange.emit(this.searchOpen);
  }

  openSearch() {
    this.searchOpen = true;
    this.searchOpenChange.emit(this.searchOpen);
  }
}
