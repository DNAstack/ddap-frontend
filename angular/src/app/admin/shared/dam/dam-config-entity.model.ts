import { EntityModel } from '../entity.model';

export interface DamConfigEntity {
  [id: string]: Map<string, EntityModel>;
}
