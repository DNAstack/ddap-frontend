import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientManageComponent } from './client-manage/client-manage.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';

@NgModule({
  declarations: [ClientListComponent, ClientManageComponent, ClientDetailComponent],
  imports: [
    CommonModule,

    SharedModule,
    ClientsRoutingModule
  ]
})
export class ClientsModule { }
