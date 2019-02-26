import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { SearchState } from '../search-state.model';
import { SearchStateService } from '../search-state.service';

@Component({
  selector: 'ddap-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input()
  label: string;

  @Input()
  icon: string = null;

  @Input()
  isSearchPage = false;

  @Input()
  backLink: any = null;

  @Input()
  searchButton = false;

  @Input()
  searchOpen = false;

  @Output()
  searchOpenChange = new EventEmitter<boolean>();

  searchBackLink: any = null;

  constructor(private searchStateService: SearchStateService) {
  }

  ngOnInit(): void {
    this.searchStateService.searchState.subscribe((state: SearchState) => {
      const {backLink} = state;
      this.searchBackLink = backLink;
    });
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
