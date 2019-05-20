import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigModificationObject } from '../../shared/configModificationObject';
import { EntityDetailBase } from '../../shared/entity-detail.base';
import { EntityModel } from '../../shared/entity.model';
import { FormErrorScrollService } from '../../shared/form-error-scroll.service';
import { PassportIssuerFormComponent } from '../passport-issuer-form/passport-issuer-form.component';
import { PassportIssuerService } from '../passport-issuers.service';

@Component({
  selector: 'ddap-passport-issuer-detail',
  templateUrl: './passport-issuer-detail.component.html',
  styleUrls: ['./passport-issuer-detail.component.scss'],
  providers: [FormErrorScrollService],
})
export class PassportIssuerDetailComponent extends EntityDetailBase<PassportIssuerService> {

  @ViewChild(PassportIssuerFormComponent)
  clientApplicationForm: PassportIssuerFormComponent;

  @ViewChild('formMatError')
  formErrorElement: ElementRef;

  constructor(route: ActivatedRoute,
              passportService: PassportIssuerService,
              private router: Router,
              public formError: FormErrorScrollService) {
    super(route, passportService, 'passportName');
  }

  update() {
    if (!this.formError.validate(this.clientApplicationForm.form, this.formErrorElement)) {
      return;
    }

    const clientApplication: EntityModel = this.clientApplicationForm.getModel();
    const change = new ConfigModificationObject(clientApplication.dto, {});
    this.entityService.update(this.entity.name, change)
      .subscribe(this.navigateUp);
  }

  delete() {
    this.entityService.remove(this.entity.name)
      .subscribe(this.navigateUp);
  }

  private navigateUp = () => this.router.navigate(['..'], { relativeTo: this.route });
}
