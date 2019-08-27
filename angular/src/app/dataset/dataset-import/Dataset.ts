import { Pagination } from '../dataset-results/Pagination';

export interface Dataset {
  schema: Schema;
  objects: Array<object>;
  pagination?: Pagination;
}

interface Schema {
  [key: string]: any;
}

