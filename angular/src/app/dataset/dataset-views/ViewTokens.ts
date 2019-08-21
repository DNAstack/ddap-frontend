export interface ViewTokens {
  view: string;
  locationAndToken?: object;
  exception?: Exception;
}

interface Exception {
  [key: string]: any;
}
