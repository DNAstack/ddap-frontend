import { NgModule } from '@angular/core';

import { AdminSharedModule } from '../shared/shared.module';

import { ResourceDetailComponent } from './resource-detail/resource-detail.component';
import { PersonaResourceAccessComponent } from './resource-form/persona-resource-access/persona-resource-access.component';
import { ResourceFormComponent } from './resource-form/resource-form.component';
import { ResourceViewFormComponent } from './resource-form/resource-view-form/resource-view-form.component';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { ResourceManageComponent } from './resource-manage/resource-manage.component';

@NgModule({
  declarations: [
    ResourceListComponent,
    ResourceManageComponent,
    ResourceDetailComponent,
    ResourceFormComponent,
    ResourceViewFormComponent,
    PersonaResourceAccessComponent,
  ],
  imports: [
    AdminSharedModule,
  ],
})
export class ResourcesModule { }
