import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs/observable/of';
import { flatMap } from 'rxjs/operators';

import { isEmptyObject, unique } from '../../shared/util';
import { DatasetService } from '../dataset.service';

@Component({
  selector: 'ddap-dataset-views',
  templateUrl: './dataset-views.component.html',
  styleUrls: ['./dataset-views.component.scss'],
})
export class DatasetViewsComponent implements OnChanges {
  datasetColumnsForm: FormGroup;
  accessTokens: Array<object> = [];
  accessTokenErrorMessages: Array<any> = [];
  noViews = false;
  genericError = '';

  URLS_EMPTY_MESSAGE = 'Urls cannot be empty or null';
  NO_VIEWS_MESSAGE = 'No views present for the selected data';

  @Input() columns: Array<string>;
  @Input() selectedRowsData: Array<object> = [];

  constructor(private datasetService: DatasetService) {
    this.datasetColumnsForm = new FormGroup({
      columnName: new FormControl('', [Validators.required]),
    });
  }

  ngOnChanges(): void {
    this.accessTokens = [];
    this.accessTokenErrorMessages = [];
    this.noViews = false;
  }

  getViewsTokens({ value }) {
    const { columnName } = value;
    const columnData: Array<string> = this.extractColumnData(columnName);
    this.accessTokens = [];
    this.accessTokenErrorMessages = [];
    this.noViews = false;
    if (columnData.length === 0) {
      this.handleErrorMessage(this.URLS_EMPTY_MESSAGE);
      return;
    }
    this.datasetService.getViews(columnData)
      .pipe(
        flatMap(views => {
          if (isEmptyObject(views)) {
            this.handleErrorMessage(this.NO_VIEWS_MESSAGE);
            return of([]);
          }
          const uniqueViews = unique(Object.values(views));
          return this.datasetService.getViewsAuthorization(uniqueViews);
        })
      ).subscribe((viewTokens) => {
        viewTokens.map((viewToken) => {
          const { locationAndToken, exception, view} = viewToken;
          if (locationAndToken) {
            this.accessTokens.push(locationAndToken);
          } else if (exception) {
            this.handleAccessTokenError(exception, view);
          }
        });
    });
  }

  enableAccessButton(): boolean {
    return (this.datasetColumnsForm.get('columnName').value &&
      (this.selectedRowsData && !!this.selectedRowsData.length));
  }

  private handleAccessTokenError(exception, view) {
    this.accessTokenErrorMessages.push(`${view} : ${exception.message}`);
  }

  private extractColumnData(columnName): Array<any> {
    return this.selectedRowsData.reduce((acc: Array<string>, c): any => {
      const columnValue: string = c[columnName];
      if (columnValue) {
        acc.push(columnValue);
      }
      return acc;
    }, []);
  }

  private handleErrorMessage(message) {
    this.genericError = message;
    this.noViews = true;
  }

}
