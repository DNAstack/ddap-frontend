import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { assemblyIds } from '../assembly.model';
import { SearchState } from '../search-state.model';
import { SearchStateService } from '../search-state.service';

import { ValidateVariant } from './variant.validator';

@Component({
  selector: 'ddap-beacon-search-bar',
  templateUrl: './beacon-search-bar.component.html',
  styleUrls: ['./beacon-search-bar.component.scss'],
})
export class BeaconSearchBarComponent implements OnDestroy, OnInit {

  @Input()
  placeholder: string;

  @Input()
  disabled: boolean;

  assemblyIds = assemblyIds;
  limitSearch = false;
  search: FormGroup;

  private resource;
  private searchStateSubscription: Subscription;

  constructor(private router: Router,
              private searchStateService: SearchStateService,
              private activatedRoute: ActivatedRoute) {

    this.search = new FormGroup({
      assembly: new FormControl(this.assemblyIds[0], [Validators.required]),
      query: new FormControl('', [Validators.required, ValidateVariant]),
    });
  }

  onSubmit({value, valid}: { value: any, valid: boolean }) {
    const currentRoute = this.router.url;
    if (currentRoute.endsWith('/data')) {
      this.searchStateService.patch({
        limitSearch: false,
        resource: null,
        backLink: currentRoute,
      });
    } else if (currentRoute.includes('/data/')) {
      this.searchStateService.patch({
        backLink: currentRoute,
      });
    }

    const resource = this.resource;
    const realmId = this.activatedRoute.root.firstChild.snapshot.params.realmId;
    this.router.navigate([realmId, 'data', 'search'], {
      queryParams: {
        ...value,
        resource,
        limitSearch: this.limitSearch,
      },
    });
  }

  ngOnInit(): void {
    this.searchStateSubscription = this.searchStateService.searchState.subscribe((state: SearchState) => {
      const {assembly, query, resource, limitSearch} = state;
      this.resource = resource;
      this.limitSearch = limitSearch;

      if (assembly) {
        this.search.patchValue({assembly});
      }

      if (limitSearch) {
        this.search.patchValue({limitSearch});
      }

      if (query) {
        this.search.patchValue({query});
      }
    });
  }

  ngOnDestroy(): void {
    this.searchStateSubscription.unsubscribe();
  }
}
