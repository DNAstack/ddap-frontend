import TrustedPassportIssuer = dam.v1.TrustedPassportIssuer;
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidationService } from 'ddap-common-lib';
import { ConfigModificationModel, EntityModel } from 'ddap-common-lib';

import { dam } from '../../../../shared/proto/dam-service';
import { DamConfigEntityFormComponentBase } from '../../shared/dam/dam-config-entity-form-component.base';
import { PassportIssuerFormComponent } from '../passport-issuer-form/passport-issuer-form.component';
import { PassportIssuerService } from '../passport-issuers.service';

@Component({
  selector: 'ddap-passport-issuer-manage',
  templateUrl: './passport-issuer-manage.component.html',
  styleUrls: ['./passport-issuer-manage.component.scss'],
  providers: [FormValidationService],
})
export class PassportIssuerManageComponent extends DamConfigEntityFormComponentBase implements OnInit {

  @ViewChild(PassportIssuerFormComponent, { static: false })
  passportIssuerForm: PassportIssuerFormComponent;

  passportIssuer: TrustedPassportIssuer;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected validationService: FormValidationService,
              private passportIssuerService: PassportIssuerService) {
    super(route, router, validationService);
  }

  ngOnInit(): void {
    this.passportIssuer = TrustedPassportIssuer.create({});
  }

  save() {
    if (!this.validate(this.passportIssuerForm)) {
      return;
    }

    const personaModel: EntityModel = this.passportIssuerForm.getModel();
    const change = new ConfigModificationModel(personaModel.dto, {});
    this.passportIssuerService.save(this.damId, personaModel.name, change)
      .subscribe(() => this.navigateUp('../..'), this.showError);
  }

}
