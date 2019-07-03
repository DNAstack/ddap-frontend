import TrustedPassportIssuer = dam.v1.TrustedPassportIssuer;
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { dam } from '../../../shared/proto/dam-service';
import { ConfigModificationObject } from '../../shared/configModificationObject';
import { EntityModel } from '../../shared/entity.model';
import { FormErrorScrollService } from '../../shared/form-error-scroll.service';
import { PassportIssuerFormComponent } from '../passport-issuer-form/passport-issuer-form.component';
import { PassportIssuerService } from '../passport-issuers.service';

@Component({
  selector: 'ddap-passport-issuer-manage',
  templateUrl: './passport-issuer-manage.component.html',
  styleUrls: ['./passport-issuer-manage.component.scss'],
  providers: [FormErrorScrollService],
})
export class PassportIssuerManageComponent implements OnInit {

  @ViewChild(PassportIssuerFormComponent)
  passportIssuerForm: PassportIssuerFormComponent;
  @ViewChild('formErrorElement')
  formErrorElement: ElementRef;

  passportIssuer: TrustedPassportIssuer;

  constructor(private passportService: PassportIssuerService,
              private router: Router,
              private route: ActivatedRoute,
              public formError: FormErrorScrollService) {
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
    this.passportService.save(this.routeDamId(), personaModel.name, change)
      .subscribe(this.navigateUp, this.showError);
  }

  private navigateUp = () => this.router.navigate(['../..'], { relativeTo: this.route });
  private showError = ({ error }: HttpErrorResponse) => {
    const message = (error instanceof Object) ? JSON.stringify(error) : error;
    return this.formError.displayErrorMessage(this.formErrorElement, message);
  }

  private routeDamId() {
    return this.route
      .snapshot
      .paramMap
      .get('damId');
  }

}
