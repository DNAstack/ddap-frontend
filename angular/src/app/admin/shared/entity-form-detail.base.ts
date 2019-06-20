import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { EntityDetailBase } from './entity-detail.base';
import { EntityModel } from './entity.model';
import { EntityService } from './entity.service';

export abstract class EntityFormDetailBase<T extends EntityService> extends EntityDetailBase<T> {
  public entity: EntityModel;

  protected constructor(protected route: ActivatedRoute,
                        protected router: Router,
                        public entityService: T,
                        protected paramName: string) {
    super(route, entityService, paramName);
  }

  protected getEntity(entityName: string) {
    return this.entityService.get()
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
