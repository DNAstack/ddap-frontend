import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigModificationObject } from '../../../shared/configModificationObject';
import { EntityDetailBase } from '../../../shared/entity-detail.base';
import { EntityModel } from '../../../shared/entity.model';
import { FormErrorScrollService } from '../../../shared/form-error-scroll.service';
import { ClientFormComponent } from '../client-form/client-form.component';
import { ClientService } from '../clients.service';

@Component({
  selector: 'ddap-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
  providers: [FormErrorScrollService],

})
export class ClientDetailComponent extends EntityDetailBase<ClientService> implements OnInit {
  @ViewChild(ClientFormComponent)
  clientForm: ClientFormComponent;

  @ViewChild('formMatError')
  formErrorElement: ElementRef;

  constructor(route: ActivatedRoute,
              service: ClientService,
              private router: Router,
              public formError: FormErrorScrollService) {
    super(route, service, 'clientName');
  }

  update() {
    if (!this.formError.validate(this.clientForm.form, this.formErrorElement)) {
      return;
    }

    const clientApplication: EntityModel = this.clientForm.getModel();
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
