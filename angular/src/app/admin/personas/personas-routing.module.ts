import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonaDetailComponent } from './persona-detail/persona-detail.component';
import { PersonaListComponent } from './persona-list/persona-list.component';
import { PersonaManageComponent } from './persona-manage/persona-manage.component';

const routes: Routes = [
  { path: ':realm/personas', component: PersonaListComponent },
  { path: ':realm/personas/:personaName', component: PersonaDetailComponent },
  { path: ':realm/personas/manage/add', component: PersonaManageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonasRoutingModule { }
