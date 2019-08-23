import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { camelCase } from '../../shared/util';
import { Dataset } from '../dataset-import/Dataset';

import { Pagination } from './Pagination';

@Component({
  selector: 'ddap-dataset-results',
  templateUrl: './dataset-results.component.html',
  styleUrls: ['./dataset-results.component.scss'],
})
export class DatasetResultsComponent implements OnInit {

  @Input()
  dataset: Dataset;

  @Output()
  fetchDatasetResults = new EventEmitter();

  list: Array<object>;
  selectedRowsData: Array<object>;
  pagination: Pagination = {} as Pagination;
  columnsToDisplay: string[] = ['select'];
  datasetColumns: string[];
  selection = new SelectionModel<object>(true, []);

  constructor() { }

  ngOnInit() {
    if (this.dataset) {
      this.list = this.dataset.objects;
      this.datasetColumns = Object.keys(this.dataset.schema.schema.properties);
      this.columnsToDisplay = this.columnsToDisplay.concat(this.datasetColumns);
      this.pagination = this.formatPagination(this.dataset.pagination);
    }
  }

  private isAllSelected() {
    const selectedRows = this.selection.selected.length;
    return this.list.length === selectedRows;
  }

  private rowSelection(row) {
    this.selection.toggle(row);
    this.selectedRowsData = this.selection.selected;
  }

  private masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.list.map(row => this.selection.select(row));
  }

  private checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  private formatPagination(pagination: object): Pagination {
    const updatedPagination = {} as Pagination;
    if (pagination) {
      Object.keys(pagination)
        .map(key => {
          updatedPagination[camelCase(key)] = pagination[key];
        });
    }
    return updatedPagination;
  }

  private redirectToPage(pageUrl: string) {
    this.fetchDatasetResults.next(pageUrl);
  }

}
