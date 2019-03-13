import { ActivatedRoute, Router } from '@angular/router';

import { ConfigModificationObject } from './configModificationObject';
import { EntityService } from './entity.service';

/**
 * Base class for components that create new config items.
 */
export class EntityManageBase<T extends EntityService> {

  constructor(protected entityService: T,
              protected router: Router,
              protected route: ActivatedRoute) {
  }

  onSubmit(id: string, value: any) {
    const item: object = JSON.parse(value);
    const change = new ConfigModificationObject(item, {});
    this.entityService.save(id, change)
      .subscribe(() => this.router.navigate(['../..'], { relativeTo: this.route }));
  }
}
