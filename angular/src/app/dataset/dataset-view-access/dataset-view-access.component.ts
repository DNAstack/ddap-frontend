import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ddap-dataset-view-access',
  templateUrl: './dataset-view-access.component.html',
  styleUrls: ['./dataset-view-access.component.scss'],
})
export class DatasetViewAccessComponent implements OnInit {

  @Input()
  access;

  constructor() { }

  ngOnInit() {
  }

}
