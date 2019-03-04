import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataDetailComponent } from './data-detail/data-detail.component';
import { DataListComponent } from './data-list/data-list.component';
import { DataSearchComponent } from './data-search/data-search.component';

const routes: Routes = [
  {path: ':realm/data', component: DataListComponent},
  {path: ':realm/data/search', component: DataSearchComponent},
  {path: ':realm/data/:resourceName', component: DataDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataRoutingModule {
}
