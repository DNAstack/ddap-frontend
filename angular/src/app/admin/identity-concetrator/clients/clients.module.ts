import { NgModule } from '@angular/core';

import { IdentityConcentratorSharedModule } from '../shared/shared.module';

import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientManageComponent } from './client-manage/client-manage.component';

@NgModule({
  declarations: [
    ClientListComponent,
    ClientManageComponent,
    ClientDetailComponent,
  ],
  imports: [
    IdentityConcentratorSharedModule,
  ],
})
export class ClientsModule { }
