import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flatMap, map } from 'rxjs/operators';

import { EntityModel } from './entity.model';
import { EntityService } from './entity.service';

export class EntityDetailBase<T extends EntityService> implements OnInit {
  public entity: EntityModel;

  constructor(protected route: ActivatedRoute,
              protected entityService: T,
              protected paramName: string) {}

  ngOnInit() {
    this.route.params.pipe(
      flatMap(params => this.getEntity(params[this.paramName]))
    ).subscribe(entity => this.entity = entity);
  }

  protected getEntity(entityName: string) {
    return this.entityService.get()
      .pipe(map(entities => entities.get(entityName)));
  }
}
