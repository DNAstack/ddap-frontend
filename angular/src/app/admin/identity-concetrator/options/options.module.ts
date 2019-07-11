import { NgModule } from '@angular/core';

import { IdentityConcentratorSharedModule } from '../shared/shared.module';

import { OptionListComponent } from './option-list/option-list.component';
import { OptionsRoutingModule } from './options-routing.module';

@NgModule({
  declarations: [
    OptionListComponent,
  ],
  imports: [
    IdentityConcentratorSharedModule,
    OptionsRoutingModule,
  ],
})
export class OptionsModule { }
