import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigModificationObject } from '../../shared/configModificationObject';
import { DamEntityFormDetailBase } from '../../shared/dam-entity-form-detail.base';
import { EntityModel } from '../../shared/entity.model';
import { FormErrorScrollService } from '../../shared/form-error-scroll.service';
import { TrustedSourcesFormComponent } from '../trusted-sources-form/trusted-sources-form.component';
import { TrustedSourcesService } from '../trusted-sources.service';

@Component({
  selector: 'ddap-trusted-source-detail',
  templateUrl: './trusted-sources-detail.component.html',
  styleUrls: ['./trusted-sources-detail.component.scss'],
  providers: [FormErrorScrollService],
})
export class TrustedSourcesDetailComponent extends DamEntityFormDetailBase<TrustedSourcesService> {

  @ViewChild(TrustedSourcesFormComponent, { static: false })
  trustedSourcesForm: TrustedSourcesFormComponent;
  @ViewChild('formErrorElement', { static: false })
  formErrorElement: ElementRef;

  constructor(
    route: ActivatedRoute,
    trustedSourcesService: TrustedSourcesService,
    protected router: Router,
    public formError: FormErrorScrollService
  ) {
    super(route, router, trustedSourcesService, 'trustedSourceName');
  }

  update() {
    if (!this.formError.validate(this.trustedSourcesForm, this.formErrorElement)) {
      return;
    }

    const trustedSourcesModel: EntityModel = this.trustedSourcesForm.getModel();
    const change = new ConfigModificationObject(trustedSourcesModel.dto, {});
    this.entityService.update(this.routeDamId(), this.entity.name, change)
      .subscribe(this.navigateUp, this.showError);
  }

  delete() {
    this.entityService.remove(this.routeDamId(), this.entity.name)
      .subscribe(this.navigateUp, this.showError);
  }

  protected showError = ({ error }: HttpErrorResponse) => {
    const message = (error instanceof Object) ? JSON.stringify(error) : error;
    return this.formError.displayErrorMessage(this.formErrorElement, message);
  }
}
