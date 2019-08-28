export interface Workflow {
  name: string;
  status: string;
  url: string;
}

export const workflows: Workflow[] = [
  {
    name: 'Workflow 1',
    status: 'Running',
    url: 'http://url-to-gc-bucket',
  },
  {
    name: 'Workflow 2',
    status: 'Failed',
    url: 'http://url-to-gc-bucket',
  },
  {
    name: 'Workflow 3',
    status: 'Completed',
    url: 'http://url-to-gc-bucket',
  },
];
