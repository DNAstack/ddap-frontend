import { Component, Input } from '@angular/core';

@Component({
  selector: 'ddap-entity-add',
  templateUrl: './entity-add.component.html',
  styleUrls: ['./entity-add.component.scss'],
})
export class EntityAddComponent {
  @Input()
  configName: string;

  constructor() { }
}
