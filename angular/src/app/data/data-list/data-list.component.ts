import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { ResourceService } from '../../admin/resources/resources.service';
import { ImagePlaceholderRetriever } from '../../shared/image-placeholder.service';
import { objectToArray } from '../../shared/util';


@Component({
  selector: 'ddap-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss'],
  providers: [ImagePlaceholderRetriever],
})
export class DataListComponent implements OnInit {

  resources$: Observable<any[]>;

  constructor(
    private resourceService: ResourceService,
    public randomImageRetriever: ImagePlaceholderRetriever
  ) {}

  ngOnInit() {
    this.resources$ = this.resourceService.getResources()
      .pipe(
        map(objectToArray)
      );
  }

}
