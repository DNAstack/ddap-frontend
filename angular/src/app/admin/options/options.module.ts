import { NgModule } from '@angular/core';

import { AdminSharedModule } from '../shared/shared.module';

import { OptionListComponent } from './option-list/option-list.component';

@NgModule({
  declarations: [
    OptionListComponent,
  ],
  imports: [
    AdminSharedModule,
  ],
})
export class OptionsModule { }
