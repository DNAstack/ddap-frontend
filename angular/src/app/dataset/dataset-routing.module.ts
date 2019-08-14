import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DatasetSearchComponent } from './dataset-search/dataset-search.component';


const routes: Routes = [
  {path: '', component: DatasetSearchComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatasetRoutingModule { }
