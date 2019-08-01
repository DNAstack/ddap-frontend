import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DamConfigEntityListComponentBase } from '../../shared/dam/dam-config-entity-list-component.base';
import { DamConfigStore } from '../../shared/dam/dam-config.store';
import { ResourcesStore } from '../resources.store';

@Component({
  selector: 'ddap-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss'],
})
export class ResourceListComponent extends DamConfigEntityListComponentBase<ResourcesStore> implements OnInit {

  constructor(protected route: ActivatedRoute,
              protected damConfigStore: DamConfigStore,
              protected resourcesStore: ResourcesStore) {
    super(route, damConfigStore, resourcesStore);
  }

  displayableMetadata(ui: any[]): boolean {
    return !ui.every(({value}) => value === null || value === '');
  }

}
