import { Component, Input, ViewChild } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import _get from 'lodash.get';
import { Observable } from 'rxjs/Observable';

import { EntityModel } from '../entity.model';
import { JsonEditorDefaults } from '../jsonEditorDefaults';

@Component({
  selector: 'ddap-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss'],
})
export class EntityListComponent {

  error: string = null;

  @Input()
  headerTitle: string;
  @Input()
  entityList: Observable<EntityModel[]>;
  @Input()
  descriptionLabel: string;
  @Input()
  descriptionProperty: string;
  @Input()
  editorOptions: JsonEditorOptions | any;

  @ViewChild(JsonEditorComponent)
  editor: JsonEditorComponent;

  constructor() {
    this.editorOptions = new JsonEditorDefaults();
  }

  getDescription(entity: object) {
    if (!this.descriptionProperty && !this.descriptionLabel) {
      return;
    }
    return _get(entity, this.descriptionProperty, entity);
  }
}
