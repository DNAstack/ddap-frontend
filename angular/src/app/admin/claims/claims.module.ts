import { NgModule } from '@angular/core';

import { AdminSharedModule } from '../shared/shared.module';

import { ClaimDetailComponent } from './claim-detail/claim-detail.component';
import { ClaimListComponent } from './claim-list/claim-list.component';
import { ClaimManageComponent } from './claim-manage/claim-manage.component';

@NgModule({
  declarations: [
    ClaimListComponent,
    ClaimManageComponent,
    ClaimDetailComponent,
  ],
  imports: [
    AdminSharedModule,
  ],
})
export class ClaimsModule { }
