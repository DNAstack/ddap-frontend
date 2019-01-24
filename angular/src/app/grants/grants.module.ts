import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { GrantDetailComponent } from './grant-detail/grant-detail.component';
import { GrantListComponent } from './grant-list/grant-list.component';
import { GrantManageComponent } from './grant-manage/grant-manage.component';
import { GrantsRoutingModule } from './grants-routing.module';

@NgModule({
  declarations: [GrantListComponent, GrantManageComponent, GrantDetailComponent],
  imports: [
    CommonModule,

    SharedModule,
    GrantsRoutingModule,
  ],
})
export class GrantsModule { }
