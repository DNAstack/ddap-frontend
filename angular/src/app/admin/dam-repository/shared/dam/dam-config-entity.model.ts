import { EntityModel } from '../../../shared/entity.model';

export interface DamConfigEntity {
  [id: string]: Map<string, EntityModel>;
}
