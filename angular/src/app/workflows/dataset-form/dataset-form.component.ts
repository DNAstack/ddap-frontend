import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import _sampleSize from 'lodash.samplesize';
import { of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { FormValidators } from '../../shared/form/validators';
import { isEmptyObject, unique } from '../../shared/util';
import { DatasetService } from '../dataset.service';

import { Dataset } from './dataset.model';
import { ViewToken } from './view.token.model';

@Component({
  selector: 'ddap-dataset-form',
  templateUrl: './dataset-form.component.html',
  styleUrls: ['./dataset-form.component.scss'],
})
export class DatasetFormComponent implements OnInit {

  form: FormGroup;
  dataset: Dataset;
  currentDatasetUrl: string;
  selectedData: object[];
  columnDataMappedToViews: any[];
  accessTokens: ViewToken[];
  accessErrors: string[];
  error: string;

  constructor(private formBuilder: FormBuilder,
              private datasetService: DatasetService) {
  }

  get datasetUrl() {
    return this.form.get('url').value;
  }

  get selectedColumn() {
    return this.form.get('selectedColumn').value;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      url: ['', [Validators.required, FormValidators.url]],
      selectedColumn: ['', [Validators.required]],
    });
  }

  fetchDataset(url: string) {
    this.datasetService.fetchDataset(url)
      .subscribe((dataset) => {
        this.dataset = dataset;
      }, () => {
        this.dataset = null;
      });
  }

  pageChange(relativeUrl) {
    const { href: newDatasetUrl } = new URL(relativeUrl, this.datasetUrl);
    this.currentDatasetUrl = newDatasetUrl;
    this.fetchDataset(this.currentDatasetUrl);
  }

  dataSelectionChange(selection) {
    this.selectedData = selection;
  }

  getFileOnlyColumns() {
    const columns: string[] = this.getDatasetColumns();
    const samples: object[] = _sampleSize(this.dataset.objects, 15);

    return columns.filter((column) => {
      return samples.some((sample) => {
        const value = sample[column];
        return value && value.startsWith('gs://');
      });
    });
  }

  requestAccessTokens() {
    this.accessTokens = [];
    this.accessErrors = [];
    const columnData: string[] = this.extractColumnData(this.selectedColumn);

    this.datasetService.getViews(columnData)
      .pipe(
        flatMap(views => {
          if (isEmptyObject(views)) {
            this.error = 'No views associated with selected data and selected column';
            return of([]);
          }
          this.columnDataMappedToViews = views;
          return this.datasetService.getViewsAuthorization(unique(Object.values(views)));
        })
      )
      .subscribe((viewTokens: ViewToken[]) => {
        viewTokens.map((viewToken) => {
          const { locationAndToken, exception, view } = viewToken;
          if (locationAndToken) {
            this.accessTokens.push(viewToken);
          }
          if (exception) {
            this.accessErrors.push(`${view} : ${exception.message}`);
          }
        });
      });
  }

  getTokensModel(): object {
    const tokensModel = {};
    if (!this.accessTokens) {
      return tokensModel;
    }

    this.accessTokens.forEach((token) => {
      const entries = Object.entries(this.columnDataMappedToViews);
      entries.filter(([_, value]) => value.some((view) => view === token.view))
        .forEach(([key, _]) => {
          tokensModel[key] = token.locationAndToken.token;
        });
    });
    return tokensModel;
  }

  private getDatasetColumns() {
    let schemaProperties = {};
    const schemaObj = this.dataset.schema;
    if (schemaObj.hasOwnProperty('schema')) {
      schemaProperties = schemaObj.schema.properties;
    } else {
      schemaProperties = schemaObj.properties;
    }
    return Object.keys(schemaProperties);
  }

  private extractColumnData(columnName): string[] {
    return this.selectedData
      .map((rowData) => rowData[columnName])
      .filter((columnData) => columnData);
  }

}
