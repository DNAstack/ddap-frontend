import { NgModule } from '@angular/core';

import { AdminSharedModule } from '../shared/shared.module';

import { DefinitionDetailComponent } from './definition-detail/definition-detail.component';
import { DefinitionListComponent } from './definition-list/definition-list.component';
import { DefinitionManageComponent } from './definition-manage/definition-manage.component';
import { DefinitionsRoutingModule } from './definitions-routing.module';

@NgModule({
  declarations: [
    DefinitionListComponent,
    DefinitionManageComponent,
    DefinitionDetailComponent,
  ],
  imports: [
    AdminSharedModule,
    DefinitionsRoutingModule,
  ],
})
export class DefinitionsModule { }
