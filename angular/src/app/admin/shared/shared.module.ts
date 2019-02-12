import { NgModule } from '@angular/core';
import { NgJsonEditorModule } from 'ang-jsoneditor';

import { SharedModule } from '../../shared/shared.module';

import { EntityAddComponent } from './entity-add/entity-add.component';
import { EntityListComponent } from './entity-list/entity-list.component';
import { JsonPanelComponent } from './json-panel/json-panel.component';

@NgModule({
  declarations: [
    JsonPanelComponent,
    EntityListComponent,
    EntityAddComponent,
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
  ],
})
export class AdminSharedModule { }
