import { Routes } from '@angular/router';

import { ServiceDefinitionDetailComponent } from './service-definition-detail/service-definition-detail.component';
import { ServiceDefinitionListComponent } from './service-definition-list/service-definition-list.component';
import { ServiceDefinitionManageComponent } from './service-definition-manage/service-definition-manage.component';

export const SERVICE_TEMPLATES_ROUTES: Routes = [
  { path: 'service-definitions', component: ServiceDefinitionListComponent },
  { path: 'service-definitions/:serviceDefinitionName', component: ServiceDefinitionDetailComponent },
  { path: 'service-definitions/manage/add', component: ServiceDefinitionManageComponent, pathMatch: 'full' },
];
