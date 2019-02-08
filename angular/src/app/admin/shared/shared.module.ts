import { NgModule } from '@angular/core';
import { NgJsonEditorModule } from 'ang-jsoneditor';

import { SharedModule } from '../../shared/shared.module';

import { EntityListHeaderComponent } from './entity-list-header/entity-list-header.component';
import { EntityListComponent } from './entity-list/entity-list.component';
import { JsonPanelComponent } from './json-panel/json-panel.component';

@NgModule({
  declarations: [
    JsonPanelComponent,
    EntityListComponent,
    EntityListHeaderComponent,
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
    EntityListHeaderComponent,
  ],
})
export class AdminSharedModule { }
