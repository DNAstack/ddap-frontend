import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import GetTokenResponse = dam.v1.GetTokenResponse;
import { ActivatedRoute } from '@angular/router';
import _get from 'lodash.get';
import { Subscription } from 'rxjs/Subscription';

import { ResourceService } from '../../admin/resources/resources.service';
import { EntityModel } from '../../admin/shared/entity.model';
import { dam } from '../proto/dam-service';

@Component({
  selector: 'ddap-resource-view-item',
  templateUrl: './resource-view-item.component.html',
  styleUrls: ['./resource-view-item.component.scss'],
})
export class ResourceViewItemComponent {

  @Input()
  resource: EntityModel;
  @Input()
  view: EntityModel;

  accessSubscription: Subscription;
  access: GetTokenResponse;
  url?: string;

  ttlForm = new FormControl(1, Validators.compose([Validators.required, Validators.min(1)]));
  selectedTimeUnit = 'h';

  constructor(private resourceService: ResourceService, private route: ActivatedRoute) {

  }

  getAccess(): void {
    const token = _get(this.access, 'token');
    if (token || !this.ttlForm.valid) {
      return;
    }

    const viewName = this.view.name;
    const ttl = `${this.ttlForm.value}${this.selectedTimeUnit}`;
    this.accessSubscription = this.resourceService.getAccessRequestToken(this.routeDamId(), this.resource.name, viewName, { ttl })
      .subscribe((access) => {
        this.access = access;
        this.url = this.getUrlIfApplicable(viewName, access.token);
        this.ttlForm.disable();
      });
  }

  getUrlIfApplicable(viewName: string, token: string): string {
    const view = this.resource.dto.views[viewName];
    const interfaces = view.interfaces;
    const httpInterfaces = Object.keys(interfaces)
      .filter((viewInterface) => viewInterface.startsWith('http'));

    if (!httpInterfaces.length) {
      return;
    }

    const viewAccessUrl = _get(interfaces, `[${httpInterfaces[0]}].uri[0]`);
    return `${viewAccessUrl}/o?access_token=${token}`;
  }

  private routeDamId() {
    return this.route
      .snapshot
      .paramMap
      .get('damId');
  }

}
