import { NgModule } from '@angular/core';

import { AdminSharedModule } from '../../shared/shared.module';

import { AccessTableComponent } from './access-table/access-table.component';
import { JsonPanelComponent } from './json-panel/json-panel.component';

@NgModule({
  declarations: [
    AccessTableComponent,
    JsonPanelComponent,
  ],
  imports: [
    AdminSharedModule,
  ],
  exports: [
    AdminSharedModule,

    AccessTableComponent,
    JsonPanelComponent,
  ],
})
export class DamRepositorySharedModule { }
