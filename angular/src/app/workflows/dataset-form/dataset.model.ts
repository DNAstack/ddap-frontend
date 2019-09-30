export interface Dataset {
  schema: {[key: string]: any};
  objects: object[];
  pagination?: {
    previous_page_url?: string;
    prev_page_url?: string;
    next_page_url: string;
  };
}
