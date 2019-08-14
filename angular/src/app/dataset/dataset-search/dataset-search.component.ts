import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DatasetService } from '../dataset.service';

@Component({
  selector: 'ddap-dataset-search',
  templateUrl: './dataset-search.component.html',
  styleUrls: ['./dataset-search.component.scss'],
})
export class DatasetSearchComponent implements OnInit {

  datasetFetchForm: FormGroup;

  constructor(private datasetService: DatasetService) {
    this.datasetFetchForm = new FormGroup({
      url: new FormControl('', [Validators.required]),
    });
  }


  onSubmit({ value }) {
    this.datasetService.fetchDataset(value.url).subscribe(s => {
      // TODO: table
    });
  }

  ngOnInit() {
  }

}
