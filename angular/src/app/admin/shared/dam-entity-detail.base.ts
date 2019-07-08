import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flatMap, map } from 'rxjs/operators';

import { ConfigEntityService } from './config-entity.service';
import { EntityModel } from './entity.model';

export class DamEntityDetailBase<T extends ConfigEntityService> implements OnInit {
  public entity: EntityModel;

  constructor(protected route: ActivatedRoute,
              public entityService: T,
              protected paramName: string) {}

  ngOnInit() {
    this.route.params.pipe(
      flatMap(params => this.getEntity(params[this.paramName]))
    ).subscribe(entity => this.entity = entity);
  }

  public routeDamId() {
    return this.route
      .snapshot
      .paramMap
      .get('damId');
  }

  protected getEntity(entityName: string) {
    return this.entityService.get(this.routeDamId())
      .pipe(map(entities => entities.get(entityName)));
  }
}
