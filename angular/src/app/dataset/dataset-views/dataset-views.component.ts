import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ddap-dataset-views',
  templateUrl: './dataset-views.component.html',
  styleUrls: ['./dataset-views.component.scss'],
})
export class DatasetViewsComponent implements OnInit {
  datasetColumnsForm: FormGroup;
  @Input() columns;
  @Input() datasetList;

  constructor() {
    this.datasetColumnsForm = new FormGroup({
      column: new FormControl('', [Validators.required]),
    });
  }

  onSubmit({ value }) {
    // TODO make API call
  }
  ngOnInit() {
  }

}
