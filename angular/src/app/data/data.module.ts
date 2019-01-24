import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule, MatGridListModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';

import { DataDetailComponent } from './data-detail/data-detail.component';
import { DataListComponent } from './data-list/data-list.component';
import { DataRoutingModule } from './data-routing.module';


@NgModule({
  declarations: [
    DataListComponent,
    DataDetailComponent,
  ],
  imports: [
    CommonModule,

    SharedModule,
    DataRoutingModule,
    MatCardModule,
    MatGridListModule,
  ],
})
export class DataModule { }
