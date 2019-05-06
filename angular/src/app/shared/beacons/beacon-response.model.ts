
export interface BeaconResponse {

  resource: {[key: string]: string};
  name: string;
  organization: string;
  exists: boolean;
  info: {[key: string]: string};
  error: string;

}
