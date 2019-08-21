import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DatasetImportComponent } from './dataset-import/dataset-import.component';


const routes: Routes = [
  {path: '', component: DatasetImportComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatasetRoutingModule { }
