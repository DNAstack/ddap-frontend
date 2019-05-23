import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigModificationObject } from '../../../shared/configModificationObject';
import { EntityModel } from '../../../shared/entity.model';
import { FormErrorScrollService } from '../../../shared/form-error-scroll.service';
import { TrustedSourcesService } from '../../../trusted-sources/trusted-sources.service';
import { ClientFormComponent } from '../client-form/client-form.component';
import { ClientService } from '../clients.service';

@Component({
  selector: 'ddap-client-manage',
  templateUrl: './client-manage.component.html',
  styleUrls: ['./client-manage.component.scss'],
  providers: [FormErrorScrollService],
})
export class ClientManageComponent {

  @ViewChild(ClientFormComponent)
  clientForm: ClientFormComponent;

  @ViewChild('formMatError')
  formErrorElement: ElementRef;

  submitted = false;

  constructor(private client: ClientService,
              private router: Router,
              private route: ActivatedRoute,
              public formError: FormErrorScrollService) {
  }

  save() {
    const clientModel: EntityModel = this.clientForm.getModel();
    const change = new ConfigModificationObject(clientModel.dto, {});

    if (!this.formError.validate(this.clientForm, this.formErrorElement)) {
      return;
    }

    this.client.save(clientModel.name, change)
      .subscribe(() => this.router.navigate(['../..'], { relativeTo: this.route }));
  }
}
