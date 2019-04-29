import { NgModule } from '@angular/core';
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material';
import { NgJsonEditorModule } from 'ang-jsoneditor';

import { SharedModule } from '../../shared/shared.module';

import { EntityAddComponent } from './entity-add/entity-add.component';
import { EntityListComponent } from './entity-list/entity-list.component';
import { EntityManageFormComponent } from './entity-manage-form/entity-manage-form.component';
import { JsonPanelComponent } from './json-panel/json-panel.component';
import { OptionEditableListComponent } from './option-editable-list/option-editable-list.component';
import { TestFormComponent } from './test-form/test-form.component';

@NgModule({
  declarations: [
    JsonPanelComponent,
    EntityListComponent,
    EntityAddComponent,
    EntityManageFormComponent,
    OptionEditableListComponent,
    TestFormComponent,
  ],
  imports: [
    SharedModule,
    NgJsonEditorModule,
  ],
  exports: [
    SharedModule,
    NgJsonEditorModule,
    JsonPanelComponent,
    EntityListComponent,
    EntityAddComponent,
    EntityManageFormComponent,
    OptionEditableListComponent,
  ],
  providers: [
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check-indeterminate'},
  ],
})
export class AdminSharedModule { }
