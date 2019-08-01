import { NgModule } from '@angular/core';

import { DamRepositorySharedModule } from '../shared/shared.module';

import { ClientApplicationDetailComponent } from './client-application-detail/client-application-detail.component';
import { ClientApplicationFormComponent } from './client-application-form/client-application-form.component';
import { ClientApplicationListComponent } from './client-application-list/client-application-list.component';
import { ClientApplicationManageComponent } from './client-application-manage/client-application-manage.component';
import { ClientApplicationsRoutingModule } from './client-applications-routing.module';

@NgModule({
  declarations: [
    ClientApplicationListComponent,
    ClientApplicationManageComponent,
    ClientApplicationDetailComponent,
    ClientApplicationFormComponent,
  ],
  imports: [
    DamRepositorySharedModule,
    ClientApplicationsRoutingModule,
  ],
})
export class ClientApplicationsModule { }
