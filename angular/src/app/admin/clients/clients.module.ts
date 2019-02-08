import { NgModule } from '@angular/core';

import { AdminSharedModule } from '../shared/shared.module';

import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientManageComponent } from './client-manage/client-manage.component';
import { ClientsRoutingModule } from './clients-routing.module';

@NgModule({
  declarations: [
    ClientListComponent,
    ClientManageComponent,
    ClientDetailComponent,
  ],
  imports: [
    AdminSharedModule,
    ClientsRoutingModule,
  ],
})
export class ClientsModule { }
