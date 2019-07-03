import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { ConfigEntityService } from './config-entity.service';
import { DamEntityDetailBase } from './dam-entity-detail.base';
import { EntityModel } from './entity.model';

export abstract class DamEntityFormDetailBase<T extends ConfigEntityService> extends DamEntityDetailBase<T> {
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
    this.entityService.remove(this.routeDamId(), id)
      .subscribe(this.navigateUp, this.showError);
  }

  protected doUpdate(id, change) {
    this.entityService.update(this.routeDamId(), id, change)
      .subscribe(this.navigateUp, error => this.showError(error));
  }

  protected navigateUp = () => this.router.navigate(['..'], { relativeTo: this.route });
  protected abstract showError(error: HttpErrorResponse): void;
}
