import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { ClaimDetailComponent } from './claim-detail/claim-detail.component';
import { ClaimListComponent } from './claim-list/claim-list.component';
import { ClaimManageComponent } from './claim-manage/claim-manage.component';
import { ClaimsRoutingModule } from './claims-routing.module';

@NgModule({
  declarations: [ClaimListComponent, ClaimManageComponent, ClaimDetailComponent],
  imports: [
    CommonModule,

    SharedModule,
    ClaimsRoutingModule,
  ],
})
export class ClaimsModule { }
