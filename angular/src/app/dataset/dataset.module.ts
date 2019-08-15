import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule, MatSelectModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';

import { SharedModule } from '../shared/shared.module';

import { DatasetListComponent } from './dataset-list/dataset-list.component';
import { DatasetRoutingModule } from './dataset-routing.module';
import { DatasetSearchComponent } from './dataset-search/dataset-search.component';
import { DatasetViewsComponent } from './dataset-views/dataset-views.component';


@NgModule({
  declarations: [DatasetSearchComponent, DatasetListComponent, DatasetViewsComponent],
  imports: [
    CommonModule,
    DatasetRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class DatasetModule { }
