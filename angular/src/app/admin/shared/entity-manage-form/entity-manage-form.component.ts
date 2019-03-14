import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ConfigModificationObject } from '../configModificationObject';
import { EntityModel } from '../entity.model';

@Component({
  selector: 'ddap-entity-manage-form',
  templateUrl: './entity-manage-form.component.html',
  styleUrls: ['./entity-manage-form.component.scss'],
})
export class EntityManageFormComponent {

  @Input()
  label: string;

  @Output()
  submitted: EventEmitter<any> = new EventEmitter<any>();

  model: EntityModel = new EntityModel('', '{}');

  constructor() { }

  submitChange() {
    const id = this.model.name;
    const change = new ConfigModificationObject(JSON.parse(this.model.dto), {});

    this.submitted.emit({ id, change });
  }

}
