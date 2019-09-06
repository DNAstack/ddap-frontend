import { dam } from '../../shared/proto/dam-service';
import GetTokenResponse = dam.v1.GetTokenResponse;

export interface ViewToken {
  view: string;
  locationAndToken?: GetTokenResponse;
  exception?: {[key: string]: any};
}
