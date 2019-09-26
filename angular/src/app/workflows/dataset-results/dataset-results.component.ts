import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { isUrl } from '../../shared/util';
import { Dataset } from '../dataset-form/dataset.model';

@Component({
  selector: 'ddap-dataset-results',
  templateUrl: './dataset-results.component.html',
  styleUrls: ['./dataset-results.component.scss'],
})
export class DatasetResultsComponent implements OnChanges {

  @Input()
  dataset: Dataset;

  @Output()
  selectionChanged = new EventEmitter();
  @Output()
  pageChanged = new EventEmitter();

  list: Array<object>;
  selectedRowsData: Array<object>;
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
      this.selection.clear();
      this.selectedRowsData = [];
    }
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
    this.selectionChanged.emit(this.selectedRowsData);
  }

  private masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.list.map(row => this.selection.select(row));
    this.selectedRowsData = this.selection.selected;
    this.selectionChanged.emit(this.selectedRowsData);
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

  private redirectToPage(pageUrl: string) {
    this.pageChanged.next(pageUrl);
  }

}
