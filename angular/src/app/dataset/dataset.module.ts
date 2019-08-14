import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';

import { SharedModule } from '../shared/shared.module';

import { DatasetRoutingModule } from './dataset-routing.module';
import { DatasetSearchComponent } from './dataset-search/dataset-search.component';


@NgModule({
  declarations: [DatasetSearchComponent],
  imports: [
    CommonModule,
    DatasetRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class DatasetModule { }
