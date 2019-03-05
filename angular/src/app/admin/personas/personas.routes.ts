import { Routes } from '@angular/router';

import { PersonaDetailComponent } from './persona-detail/persona-detail.component';
import { PersonaListComponent } from './persona-list/persona-list.component';
import { PersonaManageComponent } from './persona-manage/persona-manage.component';

export const PERSONAS_ROUTES: Routes = [
  { path: 'personas', component: PersonaListComponent },
  { path: 'personas/:personaName', component: PersonaDetailComponent },
  { path: 'personas/manage/add', component: PersonaManageComponent, pathMatch: 'full' },
];
