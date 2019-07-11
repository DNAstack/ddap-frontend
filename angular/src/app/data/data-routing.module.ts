import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DamIdResolverService } from './dam-id-resolver.service';
import { DataDetailComponent } from './data-detail/data-detail.component';
import { DataListComponent } from './data-list/data-list.component';
import { DataSearchComponent } from './data-search/data-search.component';
import { ResourceResolverService } from './resource-resolver.service';

export const routes: Routes = [
  {path: '', component: DataListComponent},
  {path: 'search', component: DataSearchComponent},
  {
    path: ':damId/:resourceName',
    component: DataDetailComponent,
    resolve: {
      resource: ResourceResolverService,
      damId: DamIdResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataRoutingModule { }
