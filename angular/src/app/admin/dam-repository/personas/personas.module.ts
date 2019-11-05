import { NgModule } from '@angular/core';
import { DdapVisaPassportModule } from 'ddap-common-lib';

import { DamRepositorySharedModule } from '../shared/shared.module';

import { PersonaDetailComponent } from './persona-detail/persona-detail.component';
import { PassportConditionsFormComponent } from './persona-form/passport-conditions-form/passport-conditions-form.component';
import { PersonaFormComponent } from './persona-form/persona-form.component';
import { PersonaListComponent } from './persona-list/persona-list.component';
import { PersonaManageComponent } from './persona-manage/persona-manage.component';
import { PersonaAccessFormComponent } from './persona-resource-form/persona-access-form.component';
import { PersonasRoutingModule } from './personas-routing.module';

@NgModule({
  declarations: [
    PersonaListComponent,
    PersonaManageComponent,
    PersonaDetailComponent,
    PersonaFormComponent,
    PersonaAccessFormComponent,
    PassportConditionsFormComponent,
  ],
  imports: [
    DamRepositorySharedModule,
    PersonasRoutingModule,
    DdapVisaPassportModule,
  ],
})
export class PersonasModule { }
