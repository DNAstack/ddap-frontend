import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigModificationObject } from '../../shared/configModificationObject';
import { EntityModel } from '../../shared/entity.model';
import { TrustedSourcesFormComponent } from '../trusted-sources-form/trusted-sources-form.component';
import { TrustedSourcesService } from '../trusted-sources.service';

@Component({
  selector: 'ddap-trusted-source-manage',
  templateUrl: './trusted-sources-manage.component.html',
  styleUrls: ['./trusted-sources-manage.component.scss'],
})
export class TrustedSourcesManageComponent {

  @ViewChild(TrustedSourcesFormComponent)
  trustedSourcesForm: TrustedSourcesFormComponent;

  constructor(private trustedSourcesService: TrustedSourcesService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  save() {
    const trustedSourcesModel: EntityModel = this.trustedSourcesForm.getModel();
    const change = new ConfigModificationObject(trustedSourcesModel.dto, {});

    this.trustedSourcesService.save(trustedSourcesModel.name, change)
      .subscribe(() => this.router.navigate(['../..'], { relativeTo: this.route }));
  }
}
