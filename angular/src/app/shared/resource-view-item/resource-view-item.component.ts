import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ResourceViewAccess } from '../resource-view-group/resource-view-access.model';

@Component({
  selector: 'ddap-resource-view-item',
  templateUrl: './resource-view-item.component.html',
  styleUrls: ['./resource-view-item.component.scss'],
})
export class ResourceViewItemComponent {

  @Input()
  label: string;
  @Input()
  name: string;
  @Input()
  access: ResourceViewAccess;

  @Output()
  accessRequest: EventEmitter<void> = new EventEmitter();

  getAccess(): void {
    if (!this.access || !this.access.token) {
      this.accessRequest.emit();
    }
  }

}
