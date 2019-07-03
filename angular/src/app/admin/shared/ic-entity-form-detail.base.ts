import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { IcConfigEntityService } from '../identity-concetrator/shared/ic-config-entity.service';

import { EntityModel } from './entity.model';
import { IcEntityDetailBase } from './ic-entity-detail.base';

export abstract class IcEntityFormDetailBase<T extends IcConfigEntityService> extends IcEntityDetailBase<T> {
  public entity: EntityModel;

  protected constructor(protected route: ActivatedRoute,
                        protected router: Router,
                        public entityService: T,
                        protected paramName: string) {
    super(route, entityService, paramName);
  }

  protected getEntity(entityName: string) {
    return this.entityService.get(this.routeDamId())
      .pipe(map(entities => entities.get(entityName)));
  }

  protected doDelete(id: string) {
    this.entityService.remove(id)
      .subscribe(this.navigateUp, this.showError);
  }

  protected doUpdate(id, change) {
    this.entityService.update(id, change)
      .subscribe(this.navigateUp, error => this.showError(error));
  }

  protected navigateUp = () => this.router.navigate(['..'], { relativeTo: this.route });
  protected abstract showError(error: HttpErrorResponse): void;
}
