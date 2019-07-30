import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigModificationObject } from '../../../shared/configModificationObject';
import { EntityModel } from '../../../shared/entity.model';
import { FormErrorScrollService } from '../../../shared/form-error-scroll.service';
import { IcConfigEntityDetailComponentBase } from '../../../shared/ic/ic-config-entity-detail-component.base';
import { IcConfigStore } from '../../../shared/ic/ic-config.store';
import { IdentityProviderFormComponent } from '../identity-provider-form/identity-provider-form.component';
import { IdentityProviderService } from '../identity-providers.service';
import { IdentityProvidersStore } from '../identity-providers.store';

@Component({
  selector: 'ddap-identity-provider-detail',
  templateUrl: './identity-provider-detail.component.html',
  styleUrls: ['./identity-provider-detail.component.scss'],
  providers: [FormErrorScrollService],
})
export class IdentityProviderDetailComponent extends IcConfigEntityDetailComponentBase<IdentityProvidersStore> implements OnInit {

  @ViewChild('ddapForm', { static: false })
  identityProviderForm: IdentityProviderFormComponent;
  @ViewChild('formErrorElement', { static: false })
  formErrorElement: ElementRef;

  constructor(protected route: ActivatedRoute,
              protected icConfigStore: IcConfigStore,
              protected identityProvidersStore: IdentityProvidersStore,
              private identityProviderService: IdentityProviderService,
              private router: Router,
              public formError: FormErrorScrollService) {
    super(route, icConfigStore, identityProvidersStore);
  }

  update() {
    if (!this.formError.validate(this.identityProviderForm, this.formErrorElement)) {
      return;
    }

    const clientApplication: EntityModel = this.identityProviderForm.getModel();
    const change = new ConfigModificationObject(clientApplication.dto, {});
    this.identityProviderService.update(this.entity.name, change)
      .subscribe(this.navigateUp, this.showError);
  }

  delete() {
    this.identityProviderService.remove(this.entity.name)
      .subscribe(this.navigateUp, this.showError);
  }

  private navigateUp = () => this.router.navigate(['..'], { relativeTo: this.route });

  private showError = ({ error }: HttpErrorResponse) => {
    const message = (error instanceof Object) ? JSON.stringify(error) : error;
    return this.formError.displayErrorMessage(this.formErrorElement, message);
  }

}
