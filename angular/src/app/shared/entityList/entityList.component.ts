import {Component, Input, ViewChild} from '@angular/core';
import {JsonEditorComponent, JsonEditorOptions} from 'ang-jsoneditor';

import {JsonEditorDefaults} from '../jsonEditorDefaults';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss'],
})
export class EntityListComponent {
  error: string = null;

  @Input()
  entityList: any;

  @ViewChild(JsonEditorComponent)
  editor: JsonEditorComponent;

  @Input()
  editorOptions: JsonEditorOptions | any;

  @Input()
  routePrefix: string;

  constructor() {
    this.editorOptions = new JsonEditorDefaults();
  }
}
