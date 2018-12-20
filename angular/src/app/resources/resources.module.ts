import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { ResourceManageComponent } from './resource-manage/resource-manage.component';

@NgModule({
  declarations: [ResourceListComponent, ResourceManageComponent],
  imports: [
    CommonModule,

    SharedModule,
    ResourcesRoutingModule
  ]
})
export class ResourcesModule { }
