import { NgModule } from '@angular/core';

import { DamRepositorySharedModule } from '../shared/shared.module';

import { ResourceDetailComponent } from './resource-detail/resource-detail.component';
import { PersonaAccessFormComponent } from './resource-form/persona-resource-access/persona-access-form/persona-access-form.component';
import { PersonaResourceAccessComponent } from './resource-form/persona-resource-access/persona-resource-access.component';
import { ResourceFormComponent } from './resource-form/resource-form.component';
import { ResourceViewFormComponent } from './resource-form/resource-view-form/resource-view-form.component';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { ResourceManageComponent } from './resource-manage/resource-manage.component';
import { ResourcesRoutingModule } from './resources-routing.module';

@NgModule({
  declarations: [
    ResourceListComponent,
    ResourceManageComponent,
    ResourceDetailComponent,
    ResourceFormComponent,
    ResourceViewFormComponent,
    PersonaResourceAccessComponent,
    PersonaAccessFormComponent,
  ],
  imports: [
    DamRepositorySharedModule,
    ResourcesRoutingModule,
  ],
})
export class ResourcesModule { }
