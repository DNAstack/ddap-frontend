import { dam } from '../../../../shared/proto/dam-service';
import DamConfig = dam.v1.DamConfig;

export interface DamConfigs {
  [id: string]: DamConfig;
}
