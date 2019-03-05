import { NgModule } from '@angular/core';

import { AdminSharedModule } from '../shared/shared.module';

import { DefinitionDetailComponent } from './definition-detail/definition-detail.component';
import { DefinitionListComponent } from './definition-list/definition-list.component';
import { DefinitionManageComponent } from './definition-manage/definition-manage.component';

@NgModule({
  declarations: [
    DefinitionListComponent,
    DefinitionManageComponent,
    DefinitionDetailComponent,
  ],
  imports: [
    AdminSharedModule,
  ],
})
export class DefinitionsModule { }
