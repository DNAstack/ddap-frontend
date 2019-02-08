import { NgModule } from '@angular/core';

import { AdminSharedModule } from '../shared/shared.module';

import { PersonaDetailComponent } from './persona-detail/persona-detail.component';
import { PersonaListComponent } from './persona-list/persona-list.component';
import { PersonaManageComponent } from './persona-manage/persona-manage.component';
import { PersonasRoutingModule } from './personas-routing.module';

@NgModule({
  declarations: [
    PersonaListComponent,
    PersonaManageComponent,
    PersonaDetailComponent,
  ],
  imports: [
    AdminSharedModule,
    PersonasRoutingModule,
  ],
})
export class PersonasModule { }
