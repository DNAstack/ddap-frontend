
export interface BeaconResponse {

  resource: string;
  name: string;
  organization: string;
  exists: boolean;
  info: {[key: string]: string};

}
