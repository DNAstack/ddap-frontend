import { Location } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ddaplib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @Input()
  label: string;
  @Input()
  icon: string;
  @Input()
  searchable: boolean;
  @Input()
  searchInputVisible = false;
  @Input()
  isSearchPage = false;
  @Input()
  backLink: string;

  @Output()
  readonly searchOpenChange = new EventEmitter<boolean>();

  constructor(private location: Location) {
  }

  closeSearch() {
    this.toggleSearchInputVisibility();
  }

  displaySearchInput() {
    this.toggleSearchInputVisibility();
  }

  back() {
    this.location.back();
  }

  private toggleSearchInputVisibility() {
    this.searchInputVisible = !this.searchInputVisible;
    this.searchOpenChange.emit(this.searchInputVisible);
  }

}
