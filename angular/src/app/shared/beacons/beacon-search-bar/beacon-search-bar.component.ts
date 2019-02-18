import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { SearchQuery } from './SearchQuery';

@Component({
  selector: 'ddap-beacon-search-bar',
  templateUrl: './beacon-search-bar.component.html',
  styleUrls: ['./beacon-search-bar.component.scss'],
})
export class BeaconSearchBarComponent implements OnChanges {

  @Input()
  placeholder: string;
  @Input()
  disabled: boolean;
  @Input()
  searchParams: any = {};

  @Output()
  valueChanged: EventEmitter<object> = new EventEmitter<object>();

  public assemblyIds = ['GRCh37', 'GRCh38', 'NCBI36'];
  public selectedAssemblyId = 'GRCh37';
  public query = '';
  public resource = null;

  constructor(private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const params = changes.searchParams.currentValue;
    this.query = params.q || this.query;
    this.selectedAssemblyId = params.aid || this.selectedAssemblyId;
    this.resource = params.res || this.resource;
  }

  search(): void {
    const searchQuery: SearchQuery = {
      q: this.query,
      aid: this.selectedAssemblyId,
      res: this.resource,
    };

    this.router.navigate(['/data/search'], {queryParams: searchQuery});
  }
}
