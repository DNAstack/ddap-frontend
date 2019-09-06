import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Dataset } from './dataset.model';
import {DatasetService} from "../dataset.service";
import Form from "../../admin/shared/form/form";
import {FormValidators} from "../../shared/form/validators";

@Component({
  selector: 'ddap-dataset-form',
  templateUrl: './dataset-form.component.html',
  styleUrls: ['./dataset-form.component.scss'],
})
export class DatasetFormComponent implements Form, OnInit, OnDestroy {

  form: FormGroup;
  dataset: Dataset = {} as Dataset;
  datasetUrl: string;

  private searchSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private datasetService: DatasetService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      url: ['', [FormValidators.url]],
    });

    this.searchSubscription = this.activatedRoute.queryParams
      .subscribe(({dataset_url}) => {
        if (dataset_url) {
          this.initializeSearch(dataset_url);
          this.form.patchValue({url: dataset_url});
        }
      });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  getAllForms(): FormGroup[] {
    return [];
  }

  isValid(): boolean {
    return false;
  }

  onSubmit({ value }) {
    if (this.form.valid) {
      this.fetchDatasetResults(value.url);
    }
  }

  fetchPageResults(relativeUrl) {
    const urlObject = new URL(relativeUrl, this.datasetUrl);
    this.fetchDatasetResults(urlObject.href);
  }

  fetchDatasetResults(url: string) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        dataset_url: url,
      },
      queryParamsHandling: 'merge',
    });
  }

  initializeSearch(url: string) {
    this.datasetUrl = url;
    this.datasetService.fetchDataset(url).subscribe(data => {
      this.dataset = data;
    },
      () => {
        this.dataset = {} as Dataset;
      });
  }



}
