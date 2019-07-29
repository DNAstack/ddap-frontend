import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigModificationObject } from '../../shared/configModificationObject';
import { DamConfigEntityDetailComponentBase } from '../../shared/dam/dam-config-entity-detail-component.base';
import { DamConfigStore } from '../../shared/dam/dam-config.store';
import { EntityModel } from '../../shared/entity.model';
import { FormErrorScrollService } from '../../shared/form-error-scroll.service';
import { TrustedSourcesFormComponent } from '../trusted-sources-form/trusted-sources-form.component';
import { TrustedSourcesService } from '../trusted-sources.service';
import { TrustedSourcesStore } from '../trusted-sources.store';

@Component({
  selector: 'ddap-trusted-source-detail',
  templateUrl: './trusted-sources-detail.component.html',
  styleUrls: ['./trusted-sources-detail.component.scss'],
  providers: [FormErrorScrollService],
})
export class TrustedSourcesDetailComponent extends DamConfigEntityDetailComponentBase<TrustedSourcesStore> implements OnInit {

  @ViewChild(TrustedSourcesFormComponent, { static: false })
  trustedSourcesForm: TrustedSourcesFormComponent;
  @ViewChild('formErrorElement', { static: false })
  formErrorElement: ElementRef;

  constructor(protected route: ActivatedRoute,
              protected damConfigStore: DamConfigStore,
              protected trustedSourcesStore: TrustedSourcesStore,
              private trustedSourcesService: TrustedSourcesService,
              private router: Router,
              public formError: FormErrorScrollService) {
    super(route, damConfigStore, trustedSourcesStore);
  }

  update() {
    if (!this.formError.validate(this.trustedSourcesForm, this.formErrorElement)) {
      return;
    }

    const trustedSourcesModel: EntityModel = this.trustedSourcesForm.getModel();
    const change = new ConfigModificationObject(trustedSourcesModel.dto, {});
    this.trustedSourcesService.update(this.damId, this.entity.name, change)
      .subscribe(this.navigateUp, this.showError);
  }

  delete() {
    this.trustedSourcesService.remove(this.damId, this.entity.name)
      .subscribe(this.navigateUp, this.showError);
  }

  protected navigateUp = () => this.router.navigate(['..'], { relativeTo: this.route });

  protected showError = ({ error }: HttpErrorResponse) => {
    const message = (error instanceof Object) ? JSON.stringify(error) : error;
    return this.formError.displayErrorMessage(this.formErrorElement, message);
  }
}
