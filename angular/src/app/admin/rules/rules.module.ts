import { NgModule } from '@angular/core';

import { AdminSharedModule } from '../shared/shared.module';

import { RuleDetailComponent } from './rule-detail/rule-detail.component';
import { RuleListComponent } from './rule-list/rule-list.component';
import { RuleManageComponent } from './rule-manage/rule-manage.component';

@NgModule({
  declarations: [
    RuleListComponent,
    RuleManageComponent,
    RuleDetailComponent,
  ],
  imports: [
    AdminSharedModule,
  ],
})
export class RulesModule { }
