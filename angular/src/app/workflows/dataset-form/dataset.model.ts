import {PaginationModel} from "../dataset-results/pagination.model";

export interface Dataset {
  schema: Schema;
  objects: Array<object>;
  pagination?: PaginationModel;
}

interface Schema {
  [key: string]: any;
}

