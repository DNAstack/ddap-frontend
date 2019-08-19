import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { DatasetService } from '../dataset.service';

@Component({
  selector: 'ddap-dataset-views',
  templateUrl: './dataset-views.component.html',
  styleUrls: ['./dataset-views.component.scss'],
})
export class DatasetViewsComponent implements OnInit {
  datasetColumnsForm: FormGroup;
  accessTokens: Array<object> = [];
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

  getAccessTokens(columnName: string, ttl: object) {
    this.datasetList$.subscribe(data => {
      const columnData = this.extractColumnData(data, columnName);
      this.datasetService.getViews(columnData)
        .subscribe(views => {
          const uniqueViews = this.getUniqueValues(views);
          uniqueViews.map(view => {
            // TODO: Handle view
            this.datasetService.getAccessTokens(view, ttl).subscribe(access => this.accessTokens.push(access));
          });
        });
    });
  }

  extractColumnData(data: Array<object>, columnName) {
    // TODO: refactor
    return data.reduce((acc: Array<string>, c) => {
      const columnValue: string = c[columnName];
      if (columnValue) {
        acc.push(columnValue);
      }
      return acc;
    }, []);
  }

  getUniqueValues(views) {
    // TODO: refactor
    return views.reduce((acc, view) =>  {
      const viewUrls = Object.values(view)[0];
      viewUrls.map(v => {
        if (!acc.includes(v)) {
          acc.push(v);
        }
      });
      return acc;
    }, []);
  }

  ngOnInit() {
  }

}
