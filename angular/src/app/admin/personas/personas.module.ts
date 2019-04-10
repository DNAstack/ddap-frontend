import { NgModule } from '@angular/core';

import { AdminSharedModule } from '../shared/shared.module';

import { PersonaFormComponent } from './form/persona-form.component';
import { PersonaDetailComponent } from './persona-detail/persona-detail.component';
import { PersonaListComponent } from './persona-list/persona-list.component';
import { PersonaManageComponent } from './persona-manage/persona-manage.component';

@NgModule({
  declarations: [
    PersonaListComponent,
    PersonaManageComponent,
    PersonaDetailComponent,
    PersonaFormComponent,
  ],
  imports: [
    AdminSharedModule,
  ],
})
export class PersonasModule { }
