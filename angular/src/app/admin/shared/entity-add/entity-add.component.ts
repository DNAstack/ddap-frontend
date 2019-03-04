import { Component, Input } from '@angular/core';

import { RealmService } from '../../../shared/realm.service';

@Component({
  selector: 'ddap-entity-add',
  templateUrl: './entity-add.component.html',
  styleUrls: ['./entity-add.component.scss'],
})
export class EntityAddComponent {
  @Input()
  configName: string;

  constructor(public realmService: RealmService) { }
}
