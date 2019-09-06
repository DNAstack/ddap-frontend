export interface ViewTokensModel {
  view: string;
  locationAndToken?: object;
  exception?: Exception;
}

interface Exception {
  [key: string]: any;
}
