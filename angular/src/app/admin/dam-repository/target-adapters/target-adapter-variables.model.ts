import { dam } from '../../../shared/proto/dam-service';
import VariableFormat = dam.v1.VariableFormat;

export interface TargetAdapterVariables {
  [id: string]: VariableFormat;
}
