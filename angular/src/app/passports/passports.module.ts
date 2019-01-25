import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { PassportDetailComponent } from './passport-detail/passport-detail.component';
import { PassportListComponent } from './passport-list/passport-list.component';
import { PassportManageComponent } from './passport-manage/passport-manage.component';
import { PassportsRoutingModule } from './passports-routing.module';

@NgModule({
  declarations: [PassportListComponent, PassportManageComponent, PassportDetailComponent],
  imports: [
    CommonModule,

    SharedModule,
    PassportsRoutingModule,
  ],
})
export class PassportsModule { }
