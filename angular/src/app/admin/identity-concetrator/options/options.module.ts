import { NgModule } from '@angular/core';

import { IdentityConcentratorSharedModule } from '../shared/shared.module';

import { OptionListComponent } from './option-list/option-list.component';

@NgModule({
  declarations: [
    OptionListComponent,
  ],
  imports: [
    IdentityConcentratorSharedModule,
  ],
})
export class OptionsModule { }
