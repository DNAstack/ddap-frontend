import IdentityProvider = ic.v1.IdentityProvider;
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidationService } from 'ddap-common-lib';

import { ic } from '../../../../shared/proto/ic-service';
import { ConfigModificationModel } from '../../../shared/configModificationObject';
import { EntityModel } from '../../../shared/entity.model';
import { IcConfigEntityFormComponentBase } from '../../shared/ic/ic-config-entity-form-component.base';
import { IdentityProviderFormComponent } from '../identity-provider-form/identity-provider-form.component';
import { IdentityProviderService } from '../identity-providers.service';

@Component({
  selector: 'ddap-identity-provider-manage',
  templateUrl: './identity-provider-manage.component.html',
  styleUrls: ['./identity-provider-manage.component.scss'],
  providers: [FormValidationService],

})
export class IdentityProviderManageComponent extends IcConfigEntityFormComponentBase implements OnInit {

  @ViewChild('identityProviderForm', { static: false })
  identityProviderForm: IdentityProviderFormComponent;

  identityProvider: IdentityProvider;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected validationService: FormValidationService,
              private identityProviderService: IdentityProviderService) {
    super(route, router, validationService);
  }

  ngOnInit(): void {
    this.identityProvider = IdentityProvider.create({});
  }

  save() {
    if (!this.validate(this.identityProviderForm)) {
      return;
    }

    const personaModel: EntityModel = this.identityProviderForm.getModel();
    const change = new ConfigModificationModel(personaModel.dto, {});
    this.identityProviderService.save(personaModel.name, change)
      .subscribe(() => this.navigateUp('../..'), this.showError);
  }

}
