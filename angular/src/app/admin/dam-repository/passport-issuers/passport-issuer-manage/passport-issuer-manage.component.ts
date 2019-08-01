import TrustedPassportIssuer = dam.v1.TrustedPassportIssuer;
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { dam } from '../../../../shared/proto/dam-service';
import { ConfigModificationObject } from '../../../shared/configModificationObject';
import { EntityModel } from '../../../shared/entity.model';
import { FormErrorScrollService } from '../../../shared/form-error-scroll.service';
import { DamConfigEntityComponentBase } from '../../shared/dam/dam-config-entity-component.base';
import { PassportIssuerFormComponent } from '../passport-issuer-form/passport-issuer-form.component';
import { PassportIssuerService } from '../passport-issuers.service';

@Component({
  selector: 'ddap-passport-issuer-manage',
  templateUrl: './passport-issuer-manage.component.html',
  styleUrls: ['./passport-issuer-manage.component.scss'],
  providers: [FormErrorScrollService],
})
export class PassportIssuerManageComponent extends DamConfigEntityComponentBase implements OnInit {

  @ViewChild(PassportIssuerFormComponent, { static: false })
  passportIssuerForm: PassportIssuerFormComponent;
  @ViewChild('formErrorElement', { static: false })
  formErrorElement: ElementRef;

  passportIssuer: TrustedPassportIssuer;

  constructor(protected route: ActivatedRoute,
              private passportIssuerService: PassportIssuerService,
              private router: Router,
              public formError: FormErrorScrollService) {
    super(route);
  }

  ngOnInit(): void {
    this.passportIssuer = TrustedPassportIssuer.create({});
  }

  save() {
    if (!this.formError.validate(this.passportIssuerForm, this.formErrorElement)) {
      return;
    }

    const personaModel: EntityModel = this.passportIssuerForm.getModel();
    const change = new ConfigModificationObject(personaModel.dto, {});
    this.passportIssuerService.save(this.damId, personaModel.name, change)
      .subscribe(this.navigateUp, this.showError);
  }

  private navigateUp = () => this.router.navigate(['../..'], { relativeTo: this.route });

  private showError = ({ error }: HttpErrorResponse) => {
    const message = (error instanceof Object) ? JSON.stringify(error) : error;
    return this.formError.displayErrorMessage(this.formErrorElement, message);
  }

}
