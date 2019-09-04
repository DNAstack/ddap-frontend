import { flatten } from '../shared/util';

export interface Workflow {
  runs: WorkflowRun[];
  error: {
    message: string;
  };
  ui: {
    resource: string;
    resourceId: string;
    view: string;
    viewId: string;
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
            return {
              name: key,
              label: value.ui.label,
              url: value.items[0].vars.url,
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
