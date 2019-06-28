
export interface BeaconResponse {

  beaconInfo: {
    name: string,
    resourceLabel: string,
    resourceId: string,
    viewId: string
  };
  datasetAlleleResponses: [{
    datasetId: string,
    exists: boolean,
    info: {[key: string]: string},
  }];
  queryError?: {
    status: number,
    message: string
  };
  error?: {
    errorCode: number,
    errorMessage: string
  };
  exists: boolean;

}
