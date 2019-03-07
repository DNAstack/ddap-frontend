import { OnInit, ViewChild } from '@angular/core';
import { JsonEditorComponent } from 'ang-jsoneditor';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { EntityModel } from './entity.model';
import { EntityService } from './entity.service';

export class EntityListBase<T extends EntityService> implements OnInit {
  entities$: Observable<EntityModel[]>;
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;

  constructor(private entityService: T) {
  }

  ngOnInit() {
    this.entities$ = this.entityService.get()
      .pipe(map(EntityModel.arrayFromMap));
  }
}
