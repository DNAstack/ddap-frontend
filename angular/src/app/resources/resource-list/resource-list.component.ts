import {Component, OnInit, ViewChild} from '@angular/core';
import { Observable } from 'rxjs';

import { ResourceService } from '../resource.service';
import {JsonEditorComponent, JsonEditorOptions} from "ang-jsoneditor";

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
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.modes = ['code', 'view'];
    this.editorOptions.mode = 'view';
    this.editorOptions.mainMenuBar = false;
    this.editorOptions.navigationBar = false;
    this.editorOptions.statusBar = false;
  }

  ngOnInit() {
    this.resources$ = this.resourceService.getResources();
  }

}
