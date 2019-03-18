import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { EntityModel } from '../../../shared/entity.model';
import { IdentityProviderService } from '../identity-providers.service';

@Component({
  selector: 'ddap-identity-provider-list',
  templateUrl: './identity-provider-list.component.html',
  styleUrls: ['./identity-provider-list.component.scss'],
})
export class IdentityProviderListComponent implements OnInit {

  identityProviders$: Observable<any[]>;

  constructor(private identityProviderService: IdentityProviderService) {
  }

  ngOnInit() {
    this.identityProviders$ = this.identityProviderService.get()
      .pipe(map(EntityModel.arrayFromMap));
  }

}
