import { Component, Input } from '@angular/core';
import _get from 'lodash.get';

import { EntityModel } from '../../admin/shared/entity.model';
import { ResourceViewService } from '../resource-view.service';

import { ResourceViewAccess } from './resource-view-access.model';

@Component({
  selector: 'ddap-resource-view-group',
  templateUrl: './resource-view-group.component.html',
  styleUrls: ['./resource-view-group.component.scss'],
})
export class ResourceViewGroupComponent {

  @Input()
  resource: EntityModel;
  @Input()
  views: EntityModel[];

  viewsAccess: {[key: string]: ResourceViewAccess} = {};

  constructor(private resourceViewService: ResourceViewService) {

  }

  getAccess(viewName: string): void {
    this.updateAccessStateForView(viewName, <ResourceViewAccess>{ inProgress: true });
    this.resourceViewService.getAccessRequestToken(this.resource.name, viewName)
      .subscribe(
        ({ account, token }) => this.updateAccessStateForView(viewName, {
          account,
          token,
          url: this.getUrlIfApplicable(viewName, token),
          inProgress: false,
        }),
        (error) => this.updateAccessStateForView(viewName, <ResourceViewAccess>{ error, inProgress: false })
      );
  }

  updateAccessStateForView(viewName: string, change: ResourceViewAccess) {
    this.viewsAccess[viewName] = change;
  }

  getUrlIfApplicable(viewName: string, token: string): string {
    const view = this.resource.dto.views[viewName];
    const httpInterfaces = Object.keys(view.interfaces)
      .filter((key) => key.startsWith('http'));

    if (httpInterfaces.length) {
      const viewAccessUrl = _get(view.interfaces, `[${httpInterfaces[0]}].uri[0]`);
      return `${viewAccessUrl}/o?access_token=${token}`;
    }
  }

}
