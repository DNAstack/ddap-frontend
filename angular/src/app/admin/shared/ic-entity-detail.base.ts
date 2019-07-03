import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flatMap, map } from 'rxjs/operators';

import { IcConfigEntityService } from '../identity-concetrator/shared/ic-config-entity.service';

import { EntityModel } from './entity.model';

export class IcEntityDetailBase<T extends IcConfigEntityService> implements OnInit {
  public entity: EntityModel;

  constructor(protected route: ActivatedRoute,
              public entityService: T,
              protected paramName: string) {}

  ngOnInit() {
    this.route.params.pipe(
      flatMap(params => this.getEntity(params[this.paramName]))
    ).subscribe(entity => this.entity = entity);
  }

  protected getEntity(entityName: string) {
    return this.entityService.get(this.routeDamId())
      .pipe(map(entities => entities.get(entityName)));
  }

  protected routeDamId() {
    return this.route
      .snapshot
      .paramMap
      .get('damId');
  }
}
