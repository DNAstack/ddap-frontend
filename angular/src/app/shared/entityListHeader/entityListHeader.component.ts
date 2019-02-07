import { Component, Input } from '@angular/core';
import pluralize from 'pluralize';

@Component({
  selector: 'ddap-entity-list-header',
  templateUrl: './entity-list-header.component.html',
  styleUrls: ['./entity-list-header.component.scss'],
})
export class EntityListHeaderComponent {

  @Input()
  configName: string;

  getButtonText() {
    return `Add ${pluralize.singular(this.configName)}`;
  }
}
