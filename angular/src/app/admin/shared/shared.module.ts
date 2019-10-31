import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material/checkbox';
import { NgJsonEditorModule } from 'ang-jsoneditor';

import { SharedModule } from '../../shared/shared.module';
import { EntityManageFormComponent } from '../dam-repository/shared/entity-manage-form/entity-manage-form.component';

import { EntityAddComponent } from './entity-add/entity-add.component';
import { EntityDescriptionLinkComponent } from './entity-description/entity-description-link.component';
import { EntityDescriptionComponent } from './entity-description/entity-description.component';
import { EntityListComponent } from './entity-list/entity-list.component';
import {
  EntityRemovalConfirmationDialogComponent
} from './entity-removal-confirmation-dialog/entity-removal-confirmation-dialog.component';
import { OptionEditableListComponent } from './option-editable-list/option-editable-list.component';

@NgModule({
  declarations: [
    EntityListComponent,
    EntityDescriptionComponent,
    EntityDescriptionLinkComponent,
    EntityAddComponent,
    EntityManageFormComponent,
    EntityRemovalConfirmationDialogComponent,
    OptionEditableListComponent,
  ],
  imports: [
    SharedModule,
    NgJsonEditorModule,
    MatButtonToggleModule,
  ],
  exports: [
    SharedModule,
    NgJsonEditorModule,
    EntityListComponent,
    EntityDescriptionComponent,
    EntityDescriptionLinkComponent,
    EntityAddComponent,
    EntityManageFormComponent,
    EntityRemovalConfirmationDialogComponent,
    OptionEditableListComponent,
  ],
  entryComponents: [
    EntityRemovalConfirmationDialogComponent,
  ],
  providers: [
    { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check-indeterminate' },
  ],
})
export class AdminSharedModule { }
