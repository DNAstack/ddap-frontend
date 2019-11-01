import { EntityModel } from 'ddap-common-lib';

export interface DamConfigEntity {
  [id: string]: Map<string, EntityModel>;
}
