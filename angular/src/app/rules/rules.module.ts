import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { RulesRoutingModule } from './rules-routing.module';
import { RuleListComponent } from './rule-list/rule-list.component';
import { RuleManageComponent } from './rule-manage/rule-manage.component';
import { RuleDetailComponent } from './rule-detail/rule-detail.component';

@NgModule({
  declarations: [RuleListComponent, RuleManageComponent, RuleDetailComponent],
  imports: [
    CommonModule,

    SharedModule,
    RulesRoutingModule
  ]
})
export class RulesModule { }
