import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidationService } from 'ddap-common-lib';

import { ConfigModificationModel } from '../../../shared/configModificationObject';
import { EntityModel } from '../../../shared/entity.model';
import { IcConfigEntityDetailComponentBase } from '../../shared/ic/ic-config-entity-detail-component.base';
import { IcConfigStore } from '../../shared/ic/ic-config.store';
import { IdentityProviderFormComponent } from '../identity-provider-form/identity-provider-form.component';
import { IdentityProviderService } from '../identity-providers.service';
import { IdentityProvidersStore } from '../identity-providers.store';

@Component({
  selector: 'ddap-identity-provider-detail',
  templateUrl: './identity-provider-detail.component.html',
  styleUrls: ['./identity-provider-detail.component.scss'],
  providers: [FormValidationService],
})
export class IdentityProviderDetailComponent extends IcConfigEntityDetailComponentBase<IdentityProvidersStore> implements OnInit {

  @ViewChild('ddapForm', { static: false })
  identityProviderForm: IdentityProviderFormComponent;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected validationService: FormValidationService,
              protected icConfigStore: IcConfigStore,
              protected identityProvidersStore: IdentityProvidersStore,
              private identityProviderService: IdentityProviderService) {
    super(route, router, validationService, icConfigStore, identityProvidersStore);
  }

  update() {
    if (!this.validate(this.identityProviderForm)) {
      return;
    }

    const clientApplication: EntityModel = this.identityProviderForm.getModel();
    const change = new ConfigModificationModel(clientApplication.dto, {});
    this.identityProviderService.update(this.entity.name, change)
      .subscribe(() => this.navigateUp('..'), this.showError);
  }

  delete() {
    this.identityProviderService.remove(this.entity.name)
      .subscribe(() => this.navigateUp('..'), this.showError);
  }

}
