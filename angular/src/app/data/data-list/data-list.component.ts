import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ImagePlaceholderRetriever } from '../../shared/image-placeholder.service';
import { DataService } from '../data.service';


@Component({
  selector: 'ddap-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss'],
  providers: [ImagePlaceholderRetriever],
})
export class DataListComponent implements OnInit {

  resources$: Observable<any[]>;

  constructor(
    private dataService: DataService,
    public randomImageRetriever: ImagePlaceholderRetriever
  ) {}

  ngOnInit() {
    this.resources$ = this.dataService.get();
  }

}
