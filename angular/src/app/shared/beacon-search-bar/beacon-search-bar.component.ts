import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { assemblyIds } from '../assembly.model';
import { BeaconSearchParams } from '../beacon-search-params.model';
import { SearchStateService } from '../search-state.service';

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

  assemblyIds = assemblyIds;
  searchForm: FormGroup;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private searchState: SearchStateService) {

    this.searchForm = new FormGroup({
      assembly: new FormControl(this.assemblyIds[0], [Validators.required]),
      query: new FormControl('', [Validators.required, ValidateVariant]),
    });
  }

  onSubmit({value}) {
    const currentRoute = this.router.url;
    const resource = this.searchState.resource;
    const realmId = this.activatedRoute.root.firstChild.snapshot.params.realmId;
    const damId = this.searchState.damId;

    const searchParams: BeaconSearchParams = {
      ...value,
      limitSearch: this.searchState.limitSearch,
    };

    if (resource) {
      searchParams.resource = resource;
    }
    if (damId) {
      searchParams.damId = damId;
    }

    this.searchState.backLink = currentRoute;
    this.router.navigate([realmId, 'data', 'search', searchParams]);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({assembly, query, resource, limitSearch}) => {
      if (assembly) {
        this.searchForm.patchValue({assembly});
      }

      if (limitSearch) {
        this.searchForm.patchValue({limitSearch});
      }

      if (query) {
        this.searchForm.patchValue({query});
      }
    });
  }
}
