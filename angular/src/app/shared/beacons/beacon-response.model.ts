
export interface BeaconResponse {

  beaconInfo: {
    name: string,
    resourceLabel: string,
    resourceId: string,
    viewId: string
  };
  organization: string;
  exists: boolean;
  info: {[key: string]: string};
  error: {
    status: number,
    message: string
  };

}
