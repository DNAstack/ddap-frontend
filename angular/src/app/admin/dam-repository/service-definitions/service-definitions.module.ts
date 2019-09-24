import { NgModule } from '@angular/core';

import { DamRepositorySharedModule } from '../shared/shared.module';

import { ServiceDefinitionDetailComponent } from './service-definition-detail/service-definition-detail.component';
import { ServiceDefinitionFormComponent } from './service-definition-form/service-definition-form.component';
import { ServiceDefinitionListComponent } from './service-definition-list/service-definition-list.component';
import { ServiceDefinitionManageComponent } from './service-definition-manage/service-definition-manage.component';
import { ServiceDefinitionsRoutingModule } from './service-definitions-routing.module';

@NgModule({
  declarations: [
    ServiceDefinitionListComponent,
    ServiceDefinitionManageComponent,
    ServiceDefinitionDetailComponent,
    ServiceDefinitionFormComponent,
  ],
  imports: [
    DamRepositorySharedModule,
    ServiceDefinitionsRoutingModule,
  ],
})
export class ServiceDefinitionsModule { }
