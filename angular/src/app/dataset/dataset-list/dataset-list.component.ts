import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'ddap-dataset-list',
  templateUrl: './dataset-list.component.html',
  styleUrls: ['./dataset-list.component.scss'],
})
export class DatasetListComponent implements OnInit {

  @Input()
  dataset$;

  list$: Observable<object[]>;
  totalRows: number;
  columnsToDisplay: string[] = ['select'];
  datasetColumns: string[];
  selection = new SelectionModel<object>(true, []);

  constructor() { }

  isAllSelected() {
    const selectedRows = this.selection.selected.length;
    return this.totalRows === selectedRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.list$.subscribe(rows => rows.map(row => this.selection.select(row)));
  }

  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  ngOnInit() {
    this.dataset$.subscribe(data => {
      this.list$ = of(data.objects);
      this.totalRows = data.objects.length;
      this.datasetColumns = Object.keys(data.schema.properties);
      this.columnsToDisplay = this.columnsToDisplay.concat(this.datasetColumns);
    });
    // this.datasetColumns = Object.keys(this.dataset.schema.properties);
    // this.columnsToDisplay = this.columnsToDisplay.concat(this.datasetColumns);
  }

}
