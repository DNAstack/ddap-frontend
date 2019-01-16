import {Component, OnInit, ViewChild} from '@angular/core';
import { Observable } from 'rxjs';

import { ResourceService } from '../resource.service';
import {JsonEditorComponent, JsonEditorOptions} from "ang-jsoneditor";
import {JsonEditorDefaults} from "../../shared/jsonEditorDefaults";

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {

  resources$: Observable<any[]>;
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;
  editorOptions: JsonEditorOptions | any;

  constructor(private resourceService: ResourceService) {
    this.editorOptions = new JsonEditorDefaults();
  }

  ngOnInit() {
    this.resources$ = this.resourceService.getResources();
  }

}
