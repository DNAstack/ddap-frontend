import { Component, Input, ViewChild } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import _get from 'lodash.get';
import { Observable } from 'rxjs';

import { JsonEditorDefaults } from '../../../../../../src/app/admin/dam-repository/shared/jsonEditorDefaults';
import { EntityModel } from '../../../../../../src/app/admin/shared/entity.model';

@Component({
  selector: 'ddaplib-entity-list',
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

  @ViewChild(JsonEditorComponent, { static: false })
  editor: JsonEditorComponent;

  constructor() {
    this.editorOptions = new JsonEditorDefaults();
  }

  getTitle(entity: any) {
    return _get(entity, 'dto.ui.label', entity.name);
  }

  getDescription(entity: object) {
    if (!this.descriptionProperty && !this.descriptionLabel) {
      return;
    }
    return _get(entity, this.descriptionProperty, '');
  }
}
