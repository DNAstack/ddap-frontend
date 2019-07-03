import { OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JsonEditorComponent } from 'ang-jsoneditor';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { ConfigEntityService } from './config-entity.service';
import { EntityModel } from './entity.model';

export class DamEntityListBase<T extends ConfigEntityService> implements OnInit {
  entities$: Observable<EntityModel[]>;
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;

  constructor(private entityService: T,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.entities$ = this.entityService.get(this.routeDamId())
      .pipe(map(EntityModel.arrayFromMap));
  }

  private routeDamId() {
    return this.route
      .snapshot
      .paramMap
      .get('damId');
  }
}
