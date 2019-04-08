import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';

import { DataDetailComponent } from './data-detail/data-detail.component';
import { MetadataFilterPipe } from './data-detail/metadata-filter.pipe';
import { DataListComponent } from './data-list/data-list.component';
import { DataSearchComponent } from './data-search/data-search.component';


@NgModule({
  declarations: [
    DataListComponent,
    DataDetailComponent,
    DataSearchComponent,
    MetadataFilterPipe,
  ],
  imports: [
    SharedModule,

    MatGridListModule,
  ],
})
export class DataModule {
}
