import { NgModule } from '@angular/core';

import { AdminSharedModule } from '../shared/shared.module';

import { ClientApplicationDetailComponent } from './client-application-detail/client-application-detail.component';
import { ClientApplicationListComponent } from './client-application-list/client-application-list.component';
import { ClientApplicationManageComponent } from './client-application-manage/client-application-manage.component';

@NgModule({
  declarations: [
    ClientApplicationListComponent,
    ClientApplicationManageComponent,
    ClientApplicationDetailComponent,
  ],
  imports: [
    AdminSharedModule,
  ],
})
export class ClientApplicationsModule { }
