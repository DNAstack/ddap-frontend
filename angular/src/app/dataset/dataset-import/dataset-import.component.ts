import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Subscription } from 'rxjs/Subscription';

import { DatasetService } from '../dataset.service';

import { DatasetList } from './DatasetList';

@Component({
  selector: 'ddap-dataset-import',
  templateUrl: './dataset-import.component.html',
  styleUrls: ['./dataset-import.component.scss'],
})
export class DatasetImportComponent implements OnInit, OnDestroy {

  datasetFetchForm: FormGroup;
  datasetList$: Observable<DatasetList>;

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
      this.datasetList$ = of(data);
    },
      () => {
        this.datasetList$ = new Observable<DatasetList>();
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
