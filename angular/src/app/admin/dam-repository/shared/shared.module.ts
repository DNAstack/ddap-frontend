import { NgModule } from '@angular/core';

import { AdminSharedModule } from '../../shared/shared.module';

import { JsonPanelComponent } from './json-panel/json-panel.component';
import { PersonasAccessTableComponent } from './personas-access-table/personas-access-table.component';
import { TestFormComponent } from './test-form/test-form.component';

@NgModule({
  declarations: [
    PersonasAccessTableComponent,
    JsonPanelComponent,
    TestFormComponent,
  ],
  imports: [
    AdminSharedModule,
  ],
  exports: [
    AdminSharedModule,

    PersonasAccessTableComponent,
    JsonPanelComponent,
    TestFormComponent,
  ],
})
export class DamRepositorySharedModule { }
