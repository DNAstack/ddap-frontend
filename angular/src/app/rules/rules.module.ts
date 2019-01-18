import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { RuleDetailComponent } from './rule-detail/rule-detail.component';
import { RuleListComponent } from './rule-list/rule-list.component';
import { RuleManageComponent } from './rule-manage/rule-manage.component';
import { RulesRoutingModule } from './rules-routing.module';

@NgModule({
  declarations: [RuleListComponent, RuleManageComponent, RuleDetailComponent],
  imports: [
    CommonModule,

    SharedModule,
    RulesRoutingModule,
  ],
})
export class RulesModule { }
