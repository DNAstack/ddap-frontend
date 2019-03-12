import { Routes } from '@angular/router';

import { ServiceTemplateDetailComponent } from './service-template-detail/service-template-detail.component';
import { ServiceTemplateListComponent } from './service-template-list/service-template-list.component';
import { ServiceTemplateManageComponent } from './service-template-manage/service-template-manage.component';

export const SERVICE_TEMPLATES_ROUTES: Routes = [
  { path: 'service-templates', component: ServiceTemplateListComponent },
  { path: 'service-templates/:serviceTemplateName', component: ServiceTemplateDetailComponent },
  { path: 'service-templates/manage/add', component: ServiceTemplateManageComponent, pathMatch: 'full' },
];
