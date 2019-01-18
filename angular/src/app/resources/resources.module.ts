import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { ResourceDetailComponent } from './resource-detail/resource-detail.component';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { ResourceManageComponent } from './resource-manage/resource-manage.component';
import { ResourcesRoutingModule } from './resources-routing.module';

@NgModule({
  declarations: [ResourceListComponent, ResourceManageComponent, ResourceDetailComponent],
  imports: [
    CommonModule,

    SharedModule,
    ResourcesRoutingModule,
  ],
})
export class ResourcesModule { }
