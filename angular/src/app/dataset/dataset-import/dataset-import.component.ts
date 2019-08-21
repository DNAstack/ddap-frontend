import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { DatasetService } from '../dataset.service';

import { Dataset } from './Dataset';

@Component({
  selector: 'ddap-dataset-import',
  templateUrl: './dataset-import.component.html',
  styleUrls: ['./dataset-import.component.scss'],
})
export class DatasetImportComponent implements OnInit, OnDestroy {

  datasetFetchForm: FormGroup;
  dataset: Dataset = {} as Dataset;

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

  initializeSearch(url: string) {
    this.datasetService.fetchDataset(url).subscribe(data => {
      this.dataset = data;
    },
      () => {
        this.dataset = {} as Dataset;
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
