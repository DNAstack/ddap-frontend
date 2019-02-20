import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SearchQuery } from './SearchQuery';
import { ValidateVariant } from './variant.validator';

@Component({
  selector: 'ddap-beacon-search-bar',
  templateUrl: './beacon-search-bar.component.html',
  styleUrls: ['./beacon-search-bar.component.scss'],
})
export class BeaconSearchBarComponent implements OnInit {

  @Input()
  placeholder: string;
  @Input()
  disabled: boolean;

  @Output()
  valueChanged: EventEmitter<object> = new EventEmitter<object>();

  search: FormGroup;

  public assemblyIds = ['GRCh37', 'GRCh38', 'NCBI36'];
  public resource = null;

  constructor(private route: ActivatedRoute,
              private router: Router) {

    this.search = new FormGroup({
      assembly: new FormControl(this.assemblyIds[0], [Validators.required]),
      query: new FormControl('', [Validators.required, ValidateVariant]),
    });
  }

  onSubmit({value, valid}: { value: SearchQuery, valid: boolean }) {
    this.route.params
      .subscribe((params) => {
        value['resource'] = params['resourceName'];
        this.router.navigate(['/data/search'], {queryParams: value});
      });
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(
        (params: any) => {
          const {assembly, query, resource} = params;
          this.resource = resource;

          if (query) {
            this.search.patchValue({query});
          }

          if (assembly) {
            this.search.patchValue({assembly});
          }
        });
  }
}
