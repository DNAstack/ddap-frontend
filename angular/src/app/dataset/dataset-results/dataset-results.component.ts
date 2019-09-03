import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { camelCase, isEmptyObject, isUrl } from '../../shared/util';
import { Dataset } from '../dataset-import/Dataset';

import { Pagination } from './Pagination';

@Component({
  selector: 'ddap-dataset-results',
  templateUrl: './dataset-results.component.html',
  styleUrls: ['./dataset-results.component.scss'],
})
export class DatasetResultsComponent implements OnChanges {

  @Input()
  dataset: Dataset;

  @Output()
  fetchDatasetResults = new EventEmitter();

  list: Array<object>;
  selectedRowsData: Array<object>;
  pagination: Pagination = {} as Pagination;
  columnsToDisplay: string[];
  additionalColumns: string[] = ['select'];
  datasetColumns: string[];
  selection = new SelectionModel<object>(true, []);

  constructor() { }

  ngOnChanges(): void {
    if (this.dataset) {
      this.list = this.dataset.objects;
      this.datasetColumns = this.getDatasetColumns();
      this.columnsToDisplay = this.additionalColumns.concat(this.datasetColumns);
      this.pagination = this.formatPagination(this.dataset.pagination);
      this.selection.clear();
    }
  }

  hasPagination(): boolean {
    return !isEmptyObject(this.pagination);
  }

  isUrl(columnValue): boolean {
    return isUrl(columnValue);
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
    this.selectedRowsData = this.selection.selected;
  }

  private checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
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
