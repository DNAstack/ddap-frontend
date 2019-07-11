import {RouterModule, Routes} from '@angular/router';

import { OptionListComponent } from './option-list/option-list.component';
import {NgModule} from "@angular/core";

export const routes: Routes = [
  { path: '', component: OptionListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OptionsRoutingModule { }
