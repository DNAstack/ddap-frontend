import { NgModule } from '@angular/core';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';

import { AdminSharedModule } from '../shared/shared.module';

import { PersonaDetailComponent } from './persona-detail/persona-detail.component';
import { PersonaFormComponent } from './persona-form/persona-form.component';
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

    OwlDateTimeModule,
    OwlMomentDateTimeModule,
  ],
})
export class PersonasModule { }
