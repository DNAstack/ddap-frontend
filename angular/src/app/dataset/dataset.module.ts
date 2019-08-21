import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule, MatSelectModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';

import { SharedModule } from '../shared/shared.module';

import { DatasetImportComponent } from './dataset-import/dataset-import.component';
import { DatasetResultsComponent } from './dataset-results/dataset-results.component';
import { DatasetRoutingModule } from './dataset-routing.module';
import { DatasetViewAccessComponent } from './dataset-view-access/dataset-view-access.component';
import { DatasetViewsComponent } from './dataset-views/dataset-views.component';


@NgModule({
  declarations: [DatasetImportComponent, DatasetResultsComponent, DatasetViewsComponent, DatasetViewAccessComponent],
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
