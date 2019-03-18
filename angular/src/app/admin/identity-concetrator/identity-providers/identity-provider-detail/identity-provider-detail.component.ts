import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EntityDetailBase } from '../../../shared/entity-detail.base';
import { IdentityProviderService } from '../identity-providers.service';

@Component({
  selector: 'ddap-identity-provider-detail',
  templateUrl: './identity-provider-detail.component.html',
  styleUrls: ['./identity-provider-detail.component.scss'],
})
export class IdentityProviderDetailComponent extends EntityDetailBase<IdentityProviderService> implements OnInit {
  constructor(route: ActivatedRoute, identityProviderService: IdentityProviderService) {
    super(route, identityProviderService, 'identityProviderName');
  }
}
