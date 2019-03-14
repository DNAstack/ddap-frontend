import { Routes } from '@angular/router';

import { PersonaDetailComponent } from './persona-detail/persona-detail.component';
import { PersonaListComponent } from './persona-list/persona-list.component';
import { PersonaManageComponent } from './persona-manage/persona-manage.component';

export const PERSONAS_ROUTES: Routes = [
  { path: 'test-personas', component: PersonaListComponent },
  { path: 'test-personas/:personaName', component: PersonaDetailComponent },
  { path: 'test-personas/manage/add', component: PersonaManageComponent, pathMatch: 'full' },
];
