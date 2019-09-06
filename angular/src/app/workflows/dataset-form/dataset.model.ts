import { PaginationModel } from '../dataset-results/pagination.model';

export interface Dataset {
  schema: {[key: string]: any};
  objects: object[];
  pagination?: PaginationModel;
}
