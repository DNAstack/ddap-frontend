import { NgModule } from '@angular/core';

import { DamRepositorySharedModule } from '../shared/shared.module';

import { OptionListComponent } from './option-list/option-list.component';
import { OptionsRoutingModule } from './options-routing.module';

@NgModule({
  declarations: [
    OptionListComponent,
  ],
  imports: [
    DamRepositorySharedModule,
    OptionsRoutingModule,
  ],
})
export class OptionsModule { }
