import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RuleListComponent } from './rule-list/rule-list.component';
import { RuleManageComponent } from './rule-manage/rule-manage.component';
import { RuleDetailComponent } from './rule-detail/rule-detail.component';

const routes: Routes = [
  { path: 'rules', component: RuleListComponent },
  { path: 'rules/:ruleName', component: RuleDetailComponent },
  { path: 'rules/manage/add', component: RuleManageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RulesRoutingModule { }
