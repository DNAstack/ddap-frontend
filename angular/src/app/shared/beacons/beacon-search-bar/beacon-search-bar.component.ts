import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SearchQuery } from './SearchQuery';
import { ValidateVariant } from './variant.validator';

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

  search: FormGroup;

  public assemblyIds = ['GRCh37', 'GRCh38', 'NCBI36'];
  public resource = null;

  constructor(private router: Router) {
    this.search = new FormGroup({
      assembly: new FormControl(this.assemblyIds[0], [Validators.required]),
      query: new FormControl('', [Validators.required, ValidateVariant]),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {assembly, query, resource} = changes.searchParams.currentValue;
    this.resource = resource;
    if (query && assembly) {
      this.search.setValue({assembly, query});
    }
  }

  onSubmit({value, valid}: { value: SearchQuery, valid: boolean }) {
    value['resource'] = this.resource;
    this.router.navigate(['/data/search'], {queryParams: value});
  }
}
