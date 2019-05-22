import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigModificationObject } from '../../../shared/configModificationObject';
import { EntityModel } from '../../../shared/entity.model';
import { FormErrorScrollService } from '../../../shared/form-error-scroll.service';
import { TrustedSourcesFormComponent } from '../../../trusted-sources/trusted-sources-form/trusted-sources-form.component';
import { TrustedSourcesService } from '../../../trusted-sources/trusted-sources.service';

@Component({
  selector: 'ddap-client-manage',
  templateUrl: './client-manage.component.html',
  styleUrls: ['./client-manage.component.scss'],
})
export class ClientManageComponent {

  @ViewChild(TrustedSourcesFormComponent)
  trustedSourcesForm: TrustedSourcesFormComponent;

  @ViewChild('formMatError')
  formErrorElement: ElementRef;

  submitted = false;

  constructor(private trustedSourcesService: TrustedSourcesService,
              private router: Router,
              private route: ActivatedRoute,
              public formError: FormErrorScrollService) {
  }

  save() {
    const trustedSourcesModel: EntityModel = this.trustedSourcesForm.getModel();
    const change = new ConfigModificationObject(trustedSourcesModel.dto, {});

    if (!this.formError.validate(this.trustedSourcesForm.form, this.formErrorElement)) {
      return;
    }

    this.trustedSourcesService.save(trustedSourcesModel.name, change)
      .subscribe(() => this.router.navigate(['../..'], { relativeTo: this.route }));
  }
}
