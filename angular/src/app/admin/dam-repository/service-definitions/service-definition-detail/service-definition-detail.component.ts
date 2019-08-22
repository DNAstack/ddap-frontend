import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormValidationService } from '../../../shared/form/form-validation.service';
import { DamConfigEntityDetailComponentBase } from '../../shared/dam/dam-config-entity-detail-component.base';
import { DamConfigStore } from '../../shared/dam/dam-config.store';
import { ServiceDefinitionService } from '../service-definitions.service';
import { ServiceDefinitionsStore } from '../service-definitions.store';

@Component({
  selector: 'ddap-service-definition-detail',
  templateUrl: './service-definition-detail.component.html',
  styleUrls: ['./service-definition-detail.component.scss'],
})
export class ServiceDefinitionDetailComponent extends DamConfigEntityDetailComponentBase<ServiceDefinitionsStore> implements OnInit {

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected validationService: FormValidationService,
              protected damConfigStore: DamConfigStore,
              protected serviceDefinitionsStore: ServiceDefinitionsStore,
              public serviceDefinitionService: ServiceDefinitionService) {
    super(route, router, validationService, damConfigStore, serviceDefinitionsStore);
  }
}
