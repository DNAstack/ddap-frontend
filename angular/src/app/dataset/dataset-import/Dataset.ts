export interface Dataset {
  schema: Schema;
  objects: Array<object>;
}

interface Schema {
  [key: string]: any;
}
