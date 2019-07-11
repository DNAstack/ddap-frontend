import { NgModule } from '@angular/core';

import { AdminSharedModule } from '../shared/shared.module';

import { OptionListComponent } from './option-list/option-list.component';
import {OptionsRoutingModule} from "./options-routing.module";

@NgModule({
  declarations: [
    OptionListComponent,
  ],
  imports: [
    AdminSharedModule,
    OptionsRoutingModule,
  ],
})
export class OptionsModule { }
