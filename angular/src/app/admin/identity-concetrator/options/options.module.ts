import { NgModule } from '@angular/core';

import { IdentityConcentratorSharedModule } from '../shared/shared.module';

import { OptionDetailComponent } from './option-detail/option-detail.component';
import { OptionListComponent } from './option-list/option-list.component';
import { OptionManageComponent } from './option-manage/option-manage.component';

@NgModule({
  declarations: [
    OptionListComponent,
    OptionManageComponent,
    OptionDetailComponent,
  ],
  imports: [
    IdentityConcentratorSharedModule,
  ],
})
export class OptionsModule { }
