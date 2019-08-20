import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'ddap-dataset-list',
  templateUrl: './dataset-list.component.html',
  styleUrls: ['./dataset-list.component.scss'],
})
export class DatasetListComponent implements OnInit {

  @Input()
  dataset$;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  list$: Observable<object[]>;
  totalRows: number;
  selectedRowsData$: Observable<Array<object>>;
  columnsToDisplay: string[] = ['select'];
  datasetColumns: string[];
  selection = new SelectionModel<object>(true, []);

  constructor() { }

  isAllSelected() {
    const selectedRows = this.selection.selected.length;
    return this.totalRows === selectedRows;
  }

  rowSelection(row) {
    this.selection.toggle(row);
    this.selectedRowsData$ = of(this.selection.selected);
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.list$.subscribe(rows => rows.map(row => this.selection.select(row)),
        () => console.error(),
        () => this.selectedRowsData$ = of(this.selection.selected));
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
  }

}
