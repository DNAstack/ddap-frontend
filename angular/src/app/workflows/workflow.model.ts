import { flatten } from '../shared/util';

export interface Workflow {
  runs: WorkflowRun[];
  damId: string;
  resourceId: string;
  viewId: string;
  error: {
    message: string;
  };
  ui: {
    resource: string;
    view: string;
  };
}

export interface WorkflowRun {
  run_id: string;
  state: string;
}

export interface WesResourceViews {
  damId: string;
  resource: {[key: string]: any};
  views: {[key: string]: any}[];
}

export class SimplifiedWesResourceViews {
  resourceId: string;
  resource: string;
  damId: string;
  views: {
    name: string;
    label: string;
    url: string;
  }[];

  constructor(resourceId: string, resource: string, damId: string, views: { name: string; label: string; url: string }[]) {
    this.resourceId = resourceId;
    this.resource = resource;
    this.damId = damId;
    this.views = views;
  }

  static fromWesResourceViews(wesResourceViews: WesResourceViews): SimplifiedWesResourceViews {
    const views = flatten(wesResourceViews.views
      .map((viewMap) => {
        return Object.entries(viewMap)
          .map(([key, value]) => {
            const wesInterface = Object.keys(value.interfaces)[0];
            const wesUri = value.interfaces[wesInterface].uri[0];
            return {
              name: key,
              label: value.ui.label,
              url: wesUri,
            };
          });
      }));
    const resourceId = Object.keys(wesResourceViews.resource)[0];
    return new SimplifiedWesResourceViews(
      resourceId,
      wesResourceViews.resource[resourceId].ui.label,
      wesResourceViews.damId,
      views
    );
  }
}
