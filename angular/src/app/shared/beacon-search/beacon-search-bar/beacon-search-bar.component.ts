import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityModel } from 'ddap-common-lib';

import { assemblyIds } from '../assembly.model';
import { BeaconSearchParams } from '../beacon-search-params.model';

import { VariantValidators } from './variant.validator';

@Component({
  selector: 'ddap-beacon-search-bar',
  templateUrl: './beacon-search-bar.component.html',
  styleUrls: ['./beacon-search-bar.component.scss'],
})
export class BeaconSearchBarComponent implements OnInit {

  @Input()
  placeholder = '1 : 156105028 T > C';
  @Input()
  disabled: boolean;
  @Input()
  limitSearch = false;
  @Input()
  replaceUrl = false;

  assemblyIds = assemblyIds;
  searchForm: FormGroup;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {

    this.searchForm = new FormGroup({
      assembly: new FormControl(this.assemblyIds[0], [Validators.required]),
      query: new FormControl('', [Validators.required, VariantValidators.variant]),
    });
  }

  onSubmit({value}) {
    const {resource, damId}: {
      [p: string]: any,
      resource?: EntityModel,
      damId?: string
    } = this.activatedRoute.snapshot.data;
    const realmId = this.activatedRoute.root.firstChild.snapshot.params.realmId;

    const searchParams: BeaconSearchParams = {
      ...value,
      limitSearch: this.limitSearch,
    };

    if (resource && resource.name) {
      searchParams.resource = resource.name;
    }
    if (damId) {
      searchParams.damId = damId;
    }

    this.router.navigate([realmId, 'data', 'search', searchParams], {replaceUrl: this.replaceUrl});
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
