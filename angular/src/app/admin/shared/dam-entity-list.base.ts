import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { flatMap, map } from 'rxjs/operators';

import { ConfigEntityService } from './config-entity.service';
import { EntityModel } from './entity.model';

export class DamEntityListBase<T extends ConfigEntityService> implements OnInit {
  entities$: Observable<EntityModel[]>;

  constructor(protected entityService: T,
              protected route: ActivatedRoute) {
  }

  ngOnInit() {
    this.entities$ = this.route.paramMap
      .pipe(
        map(paramMap => paramMap.get('damId')),
        flatMap(id => this.entityService.get(id)),
        map(EntityModel.arrayFromMap)
      );
  }
}
