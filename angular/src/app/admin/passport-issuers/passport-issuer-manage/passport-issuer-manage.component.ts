import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { dam } from '../../../shared/proto/dam-service';
import { ConfigModificationObject } from '../../shared/configModificationObject';
import { EntityModel } from '../../shared/entity.model';
import { FormErrorScrollService } from '../../shared/form-error-scroll.service';
import { PassportIssuerFormComponent } from '../passport-issuer-form/passport-issuer-form.component';
import { PassportIssuerService } from '../passport-issuerss.service';
import TrustedPassportIssuer = dam.v1.TrustedPassportIssuer;

@Component({
  selector: 'ddap-passport-issuer-manage',
  templateUrl: './passport-issuer-manage.component.html',
  styleUrls: ['./passport-issuer-manage.component.scss'],
  providers: [FormErrorScrollService],
})
export class PassportIssuerManageComponent implements OnInit {

  @ViewChild(PassportIssuerFormComponent)
  passportIssuerForm: PassportIssuerFormComponent;

  @ViewChild('formMatError')
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
    if (!this.formError.validate(this.passportIssuerForm.form, this.formErrorElement)) {
      return;
    }

    const personaModel: EntityModel = this.passportIssuerForm.getModel();
    const change = new ConfigModificationObject(personaModel.dto, {});
    this.passportService.save(personaModel.name, change)
      .subscribe(
        () => this.router.navigate(['../..'], {relativeTo: this.route})
      );
  }
}
