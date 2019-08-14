import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ddap-dataset-list',
  templateUrl: './dataset-list.component.html',
  styleUrls: ['./dataset-list.component.scss'],
})
export class DatasetListComponent implements OnInit {

  @Input()
  dataset;

  list;
  columnsToDisplay: string[] = ['select'];
  datasetColumns: string[];
  selection = new SelectionModel(true, []);

  constructor() { }

  isAllSelected() {
    const selectedRows = this.selection.selected.length;
    const totalRows = this.list.length;
    return totalRows === selectedRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.list.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  ngOnInit() {
    this.list = this.dataset.objects;
    this.datasetColumns = Object.keys(this.dataset.schema.properties);
    this.columnsToDisplay = this.columnsToDisplay.concat(this.datasetColumns);
  }

}
