import { NgModule } from '@angular/core';

import { AdminSharedModule } from '../../shared/shared.module';

import { JsonPanelComponent } from './json-panel/json-panel.component';
import { PersonasAccessTableComponent } from './personas-access-table/personas-access-table.component';


@NgModule({
  declarations: [
    PersonasAccessTableComponent,
    JsonPanelComponent,
  ],
  imports: [
    AdminSharedModule,
  ],
  exports: [
    AdminSharedModule,

    PersonasAccessTableComponent,
    JsonPanelComponent,
  ],
})
export class DamRepositorySharedModule { }
