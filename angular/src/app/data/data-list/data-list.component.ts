import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonEditorComponent } from 'ang-jsoneditor';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { ResourceService } from '../../resources/resource.service';
import { ImagePlaceholderRetriever } from '../../shared/RandomImageRetriever';
import { objectToArray } from '../../shared/util';


@Component({
  selector: 'ddap-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss'],
  providers: [ImagePlaceholderRetriever],
})
export class DataListComponent implements OnInit {

  resources$: Observable<any[]>;
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;

  constructor(private resourceService: ResourceService, public randomImageRetriever: ImagePlaceholderRetriever) {
  }

  ngOnInit() {
    this.resources$ = this.resourceService.getResources()
      .pipe(
        map(objectToArray));
  }

}
