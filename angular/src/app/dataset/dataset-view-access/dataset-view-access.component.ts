import { Component, Input } from '@angular/core';

import { Access } from './Access';

@Component({
  selector: 'ddap-dataset-view-access',
  templateUrl: './dataset-view-access.component.html',
  styleUrls: ['./dataset-view-access.component.scss'],
})
export class DatasetViewAccessComponent {

  @Input()
  access: Access;

  constructor() { }

}
