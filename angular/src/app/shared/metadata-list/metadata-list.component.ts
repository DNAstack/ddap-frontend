import { Component, Input } from '@angular/core';

@Component({
  selector: 'ddap-metadata-list',
  templateUrl: './metadata-list.component.html',
  styleUrls: ['./metadata-list.component.scss'],
})
export class MetadataListComponent {

  @Input()
  metadata: any;
  @Input()
  includeFields: string[];

}
