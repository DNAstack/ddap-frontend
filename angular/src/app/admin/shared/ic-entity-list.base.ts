import { OnInit, ViewChild } from '@angular/core';
import { JsonEditorComponent } from 'ang-jsoneditor';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { IcConfigEntityService } from '../identity-concetrator/shared/ic-config-entity.service';

import { EntityModel } from './entity.model';

export class IcEntityListBase<T extends IcConfigEntityService> implements OnInit {
  entities$: Observable<EntityModel[]>;
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;

  constructor(private entityService: T) {
  }

  ngOnInit() {
    this.entities$ = this.entityService.get()
      .pipe(map(EntityModel.arrayFromMap));
  }
}
