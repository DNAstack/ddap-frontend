import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigModificationObject } from '../../../shared/configModificationObject';
import { EntityModel } from '../../../shared/entity.model';
import { FormErrorScrollService } from '../../../shared/form-error-scroll.service';
import { IcEntityDetailBase } from '../../../shared/ic-entity-detail.base';
import { IdentityProviderFormComponent } from '../identity-provider-form/identity-provider-form.component';
import { IdentityProviderService } from '../identity-providers.service';

@Component({
  selector: 'ddap-identity-provider-detail',
  templateUrl: './identity-provider-detail.component.html',
  styleUrls: ['./identity-provider-detail.component.scss'],
  providers: [FormErrorScrollService],
})
export class IdentityProviderDetailComponent extends IcEntityDetailBase<IdentityProviderService> implements OnInit {

  @ViewChild('ddapForm')
  identityProviderForm: IdentityProviderFormComponent;
  @ViewChild('formErrorElement')
  formErrorElement: ElementRef;

  constructor(route: ActivatedRoute,
              identityProvider: IdentityProviderService,
              private router: Router,
              public formError: FormErrorScrollService) {
    super(route, identityProvider, 'identityProviderName');
  }

  update() {
    if (!this.formError.validate(this.identityProviderForm, this.formErrorElement)) {
      return;
    }

    const clientApplication: EntityModel = this.identityProviderForm.getModel();
    const change = new ConfigModificationObject(clientApplication.dto, {});
    this.entityService.update(this.entity.name, change)
      .subscribe(this.navigateUp, this.showError);
  }

  delete() {
    this.entityService.remove(this.entity.name)
      .subscribe(this.navigateUp, this.showError);
  }

  private navigateUp = () => this.router.navigate(['..'], { relativeTo: this.route });
  private showError = ({ error }: HttpErrorResponse) => {
    const message = (error instanceof Object) ? JSON.stringify(error) : error;
    return this.formError.displayErrorMessage(this.formErrorElement, message);
  }

}
