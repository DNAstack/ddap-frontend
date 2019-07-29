import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigModificationObject } from '../../shared/configModificationObject';
import { DamConfigEntityComponentBase } from '../../shared/dam/dam-config-entity-component.base';
import { EntityModel } from '../../shared/entity.model';
import { FormErrorScrollService } from '../../shared/form-error-scroll.service';
import { TrustedSourcesFormComponent } from '../trusted-sources-form/trusted-sources-form.component';
import { TrustedSourcesService } from '../trusted-sources.service';

@Component({
  selector: 'ddap-trusted-source-manage',
  templateUrl: './trusted-sources-manage.component.html',
  styleUrls: ['./trusted-sources-manage.component.scss'],
  providers: [FormErrorScrollService],
})
export class TrustedSourcesManageComponent extends DamConfigEntityComponentBase {

  @ViewChild(TrustedSourcesFormComponent, { static: false })
  trustedSourcesForm: TrustedSourcesFormComponent;
  @ViewChild('formErrorElement', { static: false })
  formErrorElement: ElementRef;

  constructor(protected route: ActivatedRoute,
              private trustedSourcesService: TrustedSourcesService,
              private router: Router,
              public formError: FormErrorScrollService) {
    super(route);
  }

  save() {
    const trustedSourcesModel: EntityModel = this.trustedSourcesForm.getModel();
    const change = new ConfigModificationObject(trustedSourcesModel.dto, {});

    if (!this.formError.validate(this.trustedSourcesForm, this.formErrorElement)) {
      return;
    }

    this.trustedSourcesService.save(this.damId, trustedSourcesModel.name, change)
      .subscribe(this.navigateUp, this.showError);
  }

  private navigateUp = () => this.router.navigate(['../..'], { relativeTo: this.route });

  private showError = ({ error }: HttpErrorResponse) => {
    const message = (error instanceof Object) ? JSON.stringify(error) : error;
    return this.formError.displayErrorMessage(this.formErrorElement, message);
  }

}
