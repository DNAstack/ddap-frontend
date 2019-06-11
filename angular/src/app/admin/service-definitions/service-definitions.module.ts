import { NgModule } from '@angular/core';

import { AdminSharedModule } from '../shared/shared.module';

import { ServiceDefinitionDetailComponent } from './service-definition-detail/service-definition-detail.component';
import { ServiceDefinitionListComponent } from './service-definition-list/service-definition-list.component';
import { ServiceDefinitionManageComponent } from './service-definition-manage/service-definition-manage.component';

@NgModule({
  declarations: [
    ServiceDefinitionListComponent,
    ServiceDefinitionManageComponent,
    ServiceDefinitionDetailComponent,
  ],
  imports: [
    AdminSharedModule,
  ],
})
export class ServiceDefinitionsModule { }
