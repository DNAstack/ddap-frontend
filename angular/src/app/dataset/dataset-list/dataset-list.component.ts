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
  columnsToDisplay;

  constructor() { }

  ngOnInit() {
    this.list = this.dataset.objects;
    // this.columnsToDisplay =
  }

}
