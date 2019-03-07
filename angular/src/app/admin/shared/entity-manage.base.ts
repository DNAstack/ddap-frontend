import { ActivatedRoute, Router } from '@angular/router';

import { ChangeModel } from './change.model';
import { EntityModel } from './entity.model';
import { EntityService } from './entity.service';

export class EntityManageBase<T extends EntityService> {

  constructor(protected entityService: T,
              protected router: Router,
              protected route: ActivatedRoute) {
  }

  onSubmit(value: any) {
    const objectContainingPersona: object = JSON.parse(value.body);
    const change: ChangeModel = this.toChange(objectContainingPersona);
    this.entityService.save(change)
      .subscribe(() => this.router.navigate(['../..'], { relativeTo: this.route }));
  }

  private toChange(rawValue: any) {
    const keys: string[] = Object.keys(rawValue);
    if (keys.length !== 1) {
      throw new Error(`Cannot create entity from object with ${keys.length} entities.`);
    }

    const name = keys[0];
    const value = rawValue[name];

    return new ChangeModel(new EntityModel(name, value), {});
  }
}
