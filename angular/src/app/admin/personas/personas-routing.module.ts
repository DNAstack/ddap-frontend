import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonaDetailComponent } from './persona-detail/persona-detail.component';
import { PersonaListComponent } from './persona-list/persona-list.component';
import { PersonaManageComponent } from './persona-manage/persona-manage.component';

export const routes: Routes = [
  { path: '', component: PersonaListComponent },
  { path: ':entityId', component: PersonaDetailComponent },
  { path: 'manage/add', pathMatch: 'full', component: PersonaManageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonasRoutingModule { }
