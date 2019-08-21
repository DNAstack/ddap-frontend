import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Dataset } from '../dataset-import/Dataset';

@Component({
  selector: 'ddap-dataset-results',
  templateUrl: './dataset-results.component.html',
  styleUrls: ['./dataset-results.component.scss'],
})
export class DatasetResultsComponent implements OnInit {

  @Input()
  dataset: Dataset;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  list: Array<object>;
  selectedRowsData$: Observable<Array<object>>;
  columnsToDisplay: string[] = ['select'];
  datasetColumns: string[];
  selection = new SelectionModel<object>(true, []);

  constructor() { }

  isAllSelected() {
    const selectedRows = this.selection.selected.length;
    return this.list.length === selectedRows;
  }

  rowSelection(row) {
    this.selection.toggle(row);
    this.selectedRowsData$ = of(this.selection.selected);
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.list.map(row => this.selection.select(row));
  }

  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  ngOnInit() {
    if (this.dataset) {
      this.list = this.dataset.objects;
      this.datasetColumns = Object.keys(this.dataset.schema.properties);
      this.columnsToDisplay = this.columnsToDisplay.concat(this.datasetColumns);
    }
  }

}
