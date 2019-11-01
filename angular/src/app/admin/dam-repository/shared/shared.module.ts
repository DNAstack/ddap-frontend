import { NgModule } from '@angular/core';

import { AdminSharedModule } from '../../shared/shared.module';

import { EntityManageFormComponent } from './entity-manage-form/entity-manage-form.component';
import {
  EntityRemovalConfirmationDialogComponent
} from './entity-removal-confirmation-dialog/entity-removal-confirmation-dialog.component';
import { JsonPanelComponent } from './json-panel/json-panel.component';
import { PersonasAccessTableComponent } from './personas-access-table/personas-access-table.component';


@NgModule({
  declarations: [
    PersonasAccessTableComponent,
    JsonPanelComponent,
    EntityManageFormComponent,
    EntityRemovalConfirmationDialogComponent,
  ],
  imports: [
    AdminSharedModule,
  ],
  exports: [
    AdminSharedModule,

    PersonasAccessTableComponent,
    JsonPanelComponent,
    EntityManageFormComponent,
    EntityRemovalConfirmationDialogComponent,
  ],
  entryComponents: [
    EntityRemovalConfirmationDialogComponent,
  ],
})
export class DamRepositorySharedModule { }
