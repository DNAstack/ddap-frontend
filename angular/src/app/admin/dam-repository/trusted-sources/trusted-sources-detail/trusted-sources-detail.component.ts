import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidationService } from 'ddap-common-lib';

import { ConfigModificationModel } from '../../../shared/configModificationObject';
import { EntityModel } from '../../../shared/entity.model';
import { DamConfigEntityDetailComponentBase } from '../../shared/dam/dam-config-entity-detail-component.base';
import { DamConfigStore } from '../../shared/dam/dam-config.store';
import { TrustedSourcesFormComponent } from '../trusted-sources-form/trusted-sources-form.component';
import { TrustedSourcesService } from '../trusted-sources.service';
import { TrustedSourcesStore } from '../trusted-sources.store';

@Component({
  selector: 'ddap-trusted-source-detail',
  templateUrl: './trusted-sources-detail.component.html',
  styleUrls: ['./trusted-sources-detail.component.scss'],
  providers: [FormValidationService],
})
export class TrustedSourcesDetailComponent extends DamConfigEntityDetailComponentBase<TrustedSourcesStore> implements OnInit {

  @ViewChild(TrustedSourcesFormComponent, { static: false })
  trustedSourcesForm: TrustedSourcesFormComponent;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected validationService: FormValidationService,
              protected damConfigStore: DamConfigStore,
              protected trustedSourcesStore: TrustedSourcesStore,
              private trustedSourcesService: TrustedSourcesService) {
    super(route, router, validationService, damConfigStore, trustedSourcesStore);
  }

  update() {
    if (!this.validate(this.trustedSourcesForm)) {
      return;
    }

    const trustedSources: EntityModel = this.trustedSourcesForm.getModel();
    const change = new ConfigModificationModel(trustedSources.dto, {});
    this.trustedSourcesService.update(this.damId, this.entity.name, change)
      .subscribe(() => this.navigateUp('..'), this.showError);
  }

  delete() {
    this.trustedSourcesService.remove(this.damId, this.entity.name)
      .subscribe(() => this.navigateUp('..'), this.showError);
  }

}
