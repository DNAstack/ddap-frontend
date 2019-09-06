import { Component, Input } from '@angular/core';

import GetTokenResponse = dam.v1.GetTokenResponse;
import { dam } from '../proto/dam-service';

@Component({
  selector: 'ddap-view-access',
  templateUrl: './view-access.component.html',
  styleUrls: ['./view-access.component.scss'],
})
export class ViewAccessComponent {

  @Input()
  access: GetTokenResponse;
  @Input()
  url?: string;

}
