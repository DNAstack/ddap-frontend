import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataDetailComponent } from './data-detail/data-detail.component';
import { DataListComponent } from './data-list/data-list.component';

const routes: Routes = [
  { path: 'data', component: DataListComponent },
  { path: 'data/:resourceName', component: DataDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataRoutingModule { }
