import { Routes } from '@angular/router';

import { RuleDetailComponent } from './rule-detail/rule-detail.component';
import { RuleListComponent } from './rule-list/rule-list.component';
import { RuleManageComponent } from './rule-manage/rule-manage.component';

export const RULES_ROUTES: Routes = [
  { path: 'rules', component: RuleListComponent },
  { path: 'rules/:ruleName', component: RuleDetailComponent },
  { path: 'rules/manage/add', component: RuleManageComponent, pathMatch: 'full' },
];
