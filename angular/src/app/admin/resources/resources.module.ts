import { NgModule } from '@angular/core';

import { AdminSharedModule } from '../shared/shared.module';

import { ResourceDetailComponent } from './resource-detail/resource-detail.component';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { ResourceManageComponent } from './resource-manage/resource-manage.component';

@NgModule({
  declarations: [
    ResourceListComponent,
    ResourceManageComponent,
    ResourceDetailComponent,
  ],
  imports: [
    AdminSharedModule,
  ],
})
export class ResourcesModule { }
