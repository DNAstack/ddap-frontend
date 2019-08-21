import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { unique } from '../../shared/util';
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
  @Input() columns;
  @Input() datasetList$: Observable<object[]>;

  constructor(private datasetService: DatasetService) {
    this.datasetColumnsForm = new FormGroup({
      columnName: new FormControl('', [Validators.required]),
      timeDuration: new FormControl('1'),
      timeUnit: new FormControl('h'),
    });
  }

  onSubmit({ value }) {
    const {columnName, timeDuration, timeUnit} = value;
    const ttl = `${timeDuration}${timeUnit}`;
    this.getAccessTokens(columnName, { ttl });
  }

  private getAccessTokens(columnName: string, ttl: object) {
    this.datasetList$.subscribe(tableData => {
      const columnData = this.extractColumnData(tableData, columnName);
      // TODO: handle view error
      this.datasetService.getViews(columnData)
        .subscribe(views => {
          const uniqueViews = unique(Object.values(views));
          uniqueViews.map(view => {
            // TODO: Handle error
            this.datasetService.getAccessTokens(view, ttl).subscribe(access => {
              this.errorMessages = [];
              this.accessTokens.push(access);
              },
              (error) => this.handleAccessTokenError(error, view));
          });
        },
          (error) => console.error(error));
    });
  }

  private handleAccessTokenError(error, view) {
    this.errorMessages.push(`Cannot fetch token for the view: ${view}`);
  }
  private extractColumnData(tableData: Array<object>, columnName) {
    return tableData.reduce((acc: Array<string>, c) => {
      const columnValue: string = c[columnName];
      if (columnValue) {
        acc.push(columnValue);
      }
      return acc;
    }, []);
  }

}
