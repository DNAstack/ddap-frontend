import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourceListComponent } from './resource-list/resource-list.component';

@NgModule({
  declarations: [ResourceListComponent],
  imports: [
    CommonModule,

    SharedModule,
    ResourcesRoutingModule
  ]
})
export class ResourcesModule { }
