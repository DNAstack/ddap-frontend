import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { ResourceManageComponent } from './resource-manage/resource-manage.component';
import { ResourceDetailComponent } from './resource-detail/resource-detail.component';

@NgModule({
  declarations: [ResourceListComponent, ResourceManageComponent, ResourceDetailComponent],
  imports: [
    CommonModule,

    SharedModule,
    ResourcesRoutingModule
  ]
})
export class ResourcesModule { }
