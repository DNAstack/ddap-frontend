import { Component, Input, ViewChild } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import _get from 'lodash.get';

import { JsonEditorDefaults } from '../jsonEditorDefaults';

@Component({
  selector: 'ddap-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss'],
})
export class EntityListComponent {
  error: string = null;

  @Input()
  entityList: any;

  @Input()
  descriptionProperty: string;

  @ViewChild(JsonEditorComponent)
  editor: JsonEditorComponent;

  @Input()
  editorOptions: JsonEditorOptions | any;

  @Input()
  routePrefix: string;

  constructor() {
    this.editorOptions = new JsonEditorDefaults();
  }

  getDescription(entity: object) {
    return _get(entity, this.descriptionProperty);
  }
}
