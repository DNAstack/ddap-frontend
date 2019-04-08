import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import _get from 'lodash.get';
import { Subscription } from 'rxjs/Subscription';

import { EntityModel } from '../../admin/shared/entity.model';
import { ResourceViewAccess } from '../resource-view-access.model';
import { ResourceViewService } from '../resource-view.service';

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
  access: ResourceViewAccess;

  ttlForm = new FormControl(1, Validators.compose([Validators.required, Validators.min(1)]));
  selectedTimeUnit = 'h';

  constructor(private resourceViewService: ResourceViewService) {

  }

  getAccess(): void {
    const token = _get(this.access, 'token');
    if (token || !this.ttlForm.valid) {
      return;
    }

    const viewName = this.view.name;
    const ttl = `${this.ttlForm.value}${this.selectedTimeUnit}`;
    this.accessSubscription = this.resourceViewService.getAccessRequestToken(this.resource.name, viewName, ttl)
      .subscribe((access) => {
        this.access = access;
        this.access.url = this.getUrlIfApplicable(viewName, access.token);
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

}
