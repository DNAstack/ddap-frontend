import { Routes } from '@angular/router';

import { OptionDetailComponent } from './option-detail/option-detail.component';
import { OptionListComponent } from './option-list/option-list.component';
import { OptionManageComponent } from './option-manage/option-manage.component';

export const OPTIONS_ROUTES: Routes = [
  { path: 'options', component: OptionListComponent },
  { path: 'options/:optionName', component: OptionDetailComponent },
  { path: 'options/manage/add', component: OptionManageComponent, pathMatch: 'full' },
];
