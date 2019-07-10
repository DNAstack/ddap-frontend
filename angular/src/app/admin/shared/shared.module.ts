import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material/checkbox';
import { NgJsonEditorModule } from 'ang-jsoneditor';

import { SharedModule } from '../../shared/shared.module';

import { AccessTableComponent } from './access-table/access-table.component';
import { EntityAddComponent } from './entity-add/entity-add.component';
import { EntityDescriptionComponent } from './entity-description/entity-description.component';
import { EntityListComponent } from './entity-list/entity-list.component';
import { EntityManageFormComponent } from './entity-manage-form/entity-manage-form.component';
import { JsonPanelComponent } from './json-panel/json-panel.component';
import { OptionEditableListComponent } from './option-editable-list/option-editable-list.component';
import { TestFormComponent } from './test-form/test-form.component';

@NgModule({
  declarations: [
    JsonPanelComponent,
    EntityListComponent,
    EntityDescriptionComponent,
    EntityAddComponent,
    EntityManageFormComponent,
    OptionEditableListComponent,
    AccessTableComponent,
    TestFormComponent,
  ],
  imports: [
    SharedModule,
    NgJsonEditorModule,
    MatButtonToggleModule,
  ],
  exports: [
    SharedModule,
    NgJsonEditorModule,
    JsonPanelComponent,
    EntityListComponent,
    EntityDescriptionComponent,
    EntityAddComponent,
    EntityManageFormComponent,
    OptionEditableListComponent,
    AccessTableComponent,
    TestFormComponent,
  ],
  providers: [
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check-indeterminate'},
  ],
})
export class AdminSharedModule { }
