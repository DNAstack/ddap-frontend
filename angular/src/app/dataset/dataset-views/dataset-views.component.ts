import { Component, Input } from '@angular/core';
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
export class DatasetViewsComponent {
  datasetColumnsForm: FormGroup;
  accessTokens: Array<object> = [];
  errorMessages: Array<any> = [];
  noViews = false;

  @Input() columns: Array<string>;
  @Input() selectedRowsData: Array<object> = [];

  constructor(private datasetService: DatasetService) {
    this.datasetColumnsForm = new FormGroup({
      columnName: new FormControl('', [Validators.required]),
    });
  }

  getViewsTokens({ value }) {
    const { columnName } = value;
    const columnData = this.extractColumnData(columnName);
    this.accessTokens = [];
    this.errorMessages = [];
    this.noViews = false;
    this.datasetService.getViews(columnData)
      .pipe(
        flatMap(views => {
          if (isEmptyObject(views)) {
            this.noViews = true;
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
    this.errorMessages.push(`${view} : ${exception.message}`);
  }

  private extractColumnData(columnName) {
    return this.selectedRowsData.reduce((acc: Array<string>, c) => {
      const columnValue: string = c[columnName];
      if (columnValue) {
        acc.push(columnValue);
      }
      return acc;
    }, []);
  }

}
