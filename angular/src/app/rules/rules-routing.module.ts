import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RuleDetailComponent } from './rule-detail/rule-detail.component';
import { RuleListComponent } from './rule-list/rule-list.component';
import { RuleManageComponent } from './rule-manage/rule-manage.component';

const routes: Routes = [
  { path: 'rules', component: RuleListComponent },
  { path: 'rules/:ruleName', component: RuleDetailComponent },
  { path: 'rules/manage/add', component: RuleManageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RulesRoutingModule { }
