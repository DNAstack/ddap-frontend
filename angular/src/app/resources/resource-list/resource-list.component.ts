import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonEditorComponent } from 'ang-jsoneditor';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { objectToArray } from '../../shared/util';
import { ResourceService } from '../resource.service';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss'],
})
export class ResourceListComponent implements OnInit {

  resources$: Observable<any[]>;
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;

  constructor(private resourceService: ResourceService) {
  }

  ngOnInit() {
    this.resources$ = this.resourceService.getResources()
      .pipe(
        map(objectToArray));
  }

}
