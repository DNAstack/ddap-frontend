import { NgModule } from '@angular/core';

import { AdminSharedModule } from '../shared/shared.module';

import { ResourceDetailComponent } from './resource-detail/resource-detail.component';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { ResourceManageComponent } from './resource-manage/resource-manage.component';
import { ResourcesRoutingModule } from './resources-routing.module';

@NgModule({
  declarations: [
    ResourceListComponent,
    ResourceManageComponent,
    ResourceDetailComponent,
  ],
  imports: [
    AdminSharedModule,
    ResourcesRoutingModule,
  ],
})
export class ResourcesModule { }
