import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ic } from '../../../../shared/proto/ic-service';
import { ConfigModificationObject } from '../../../shared/configModificationObject';
import { EntityModel } from '../../../shared/entity.model';
import { FormErrorScrollService } from '../../../shared/form-error-scroll.service';
import { IdentityProviderFormComponent } from '../identity-provider-form/identity-provider-form.component';
import { IdentityProviderService } from '../identity-providers.service';
import IdentityProvider = ic.v1.IdentityProvider;

@Component({
  selector: 'ddap-identity-provider-manage',
  templateUrl: './identity-provider-manage.component.html',
  styleUrls: ['./identity-provider-manage.component.scss'],
  providers: [FormErrorScrollService],

})
export class IdentityProviderManageComponent implements OnInit {

  @ViewChild('ddapForm')
  identityProviderForm: IdentityProviderFormComponent;

  @ViewChild('ddapFormError')
  formErrorElement: ElementRef;

  identityProvider: IdentityProvider;

  constructor(private identityProviderService: IdentityProviderService,
              private router: Router,
              private route: ActivatedRoute,
              public formError: FormErrorScrollService) {
  }

  ngOnInit(): void {
    this.identityProvider = IdentityProvider.create({});
  }

  save() {
    if (!this.formError.validate(this.identityProviderForm, this.formErrorElement)) {
      return;
    }

    const personaModel: EntityModel = this.identityProviderForm.getModel();
    const change = new ConfigModificationObject(personaModel.dto, {});
    this.identityProviderService.save(personaModel.name, change)
      .subscribe(
        () => this.router.navigate(['../..'], {relativeTo: this.route})
      );
  }
}
