import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { DatasetService } from '../dataset.service';

import { DatasetList } from './DatasetList';

@Component({
  selector: 'ddap-dataset-search',
  templateUrl: './dataset-search.component.html',
  styleUrls: ['./dataset-search.component.scss'],
})
export class DatasetSearchComponent implements OnInit, OnDestroy {

  datasetFetchForm: FormGroup;
  datasetList: DatasetList[];

  private searchSubscription: Subscription;

  constructor(private datasetService: DatasetService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.datasetFetchForm = new FormGroup({
      url: new FormControl('', [Validators.required]),
    });
  }


  onSubmit({ value }) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        dataset_url: value.url,
      },
      queryParamsHandling: 'merge',
    });
  }

  initializeSearch(url) {
    this.datasetService.fetchDataset(url).subscribe(data => {
      this.datasetList = data;
    },
      () => {
        this.datasetList = [];
      });
  }

  ngOnInit() {
    this.searchSubscription = this.activatedRoute.queryParams
      .subscribe(({dataset_url}) => {
        if (dataset_url) {
          this.initializeSearch(dataset_url);
          this.datasetFetchForm.patchValue({url: dataset_url});
        }
      });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

}
