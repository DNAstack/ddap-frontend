import { NgModule } from '@angular/core';

import { AdminSharedModule } from '../shared/shared.module';

import { ServiceTemplateDetailComponent } from './service-template-detail/service-template-detail.component';
import { ServiceTemplateListComponent } from './service-template-list/service-template-list.component';
import { ServiceTemplateManageComponent } from './service-template-manage/service-template-manage.component';

@NgModule({
  declarations: [
    ServiceTemplateListComponent,
    ServiceTemplateManageComponent,
    ServiceTemplateDetailComponent,
  ],
  imports: [
    AdminSharedModule,
  ],
})
export class ServiceTemplatesModule { }
