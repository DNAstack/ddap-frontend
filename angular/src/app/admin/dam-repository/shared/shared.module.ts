import { NgModule } from '@angular/core';

import { AdminSharedModule } from '../../shared/shared.module';

import { AccessTableComponent } from './access-table/access-table.component';
import { JsonPanelComponent } from './json-panel/json-panel.component';
import { TestFormComponent } from './test-form/test-form.component';

@NgModule({
  declarations: [
    AccessTableComponent,
    JsonPanelComponent,
    TestFormComponent,
  ],
  imports: [
    AdminSharedModule,
  ],
  exports: [
    AdminSharedModule,

    AccessTableComponent,
    JsonPanelComponent,
    TestFormComponent,
  ],
})
export class DamRepositorySharedModule { }
