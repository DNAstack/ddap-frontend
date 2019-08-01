import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminSharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    AdminRoutingModule,
    AdminSharedModule,
  ],
})
export class AdminModule { }
