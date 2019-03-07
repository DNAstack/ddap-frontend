import { EntityModel } from './entity.model';

export class ChangeModel {
  constructor(public entity: EntityModel, public apply: any) {}
}
