import { NgModule } from '@angular/core';

import { AdminSharedModule } from '../shared/shared.module';

import { ClaimDefinitionDetailComponent } from './claim-definition-detail/claim-definition-detail.component';
import { ClaimDefinitionFormComponent } from './claim-definition-form/claim-definition-form.component';
import { ClaimDefinitionListComponent } from './claim-definition-list/claim-definition-list.component';
import { ClaimDefinitionManageComponent } from './claim-definition-manage/claim-definition-manage.component';

@NgModule({
  declarations: [
    ClaimDefinitionListComponent,
    ClaimDefinitionManageComponent,
    ClaimDefinitionDetailComponent,
    ClaimDefinitionFormComponent,
  ],
  imports: [
    AdminSharedModule,
  ],
})
export class ClaimDefinitionsModule { }
