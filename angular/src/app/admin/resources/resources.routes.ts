import { Routes } from '@angular/router';

import { ResourceDetailComponent } from './resource-detail/resource-detail.component';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { ResourceManageComponent } from './resource-manage/resource-manage.component';

export const RESOURCES_ROUTES: Routes = [
  { path: 'resources', component: ResourceListComponent },
  { path: 'resources/:resourceName', component: ResourceDetailComponent },
  { path: 'resources/manage/add', component: ResourceManageComponent, pathMatch: 'full' },
];
