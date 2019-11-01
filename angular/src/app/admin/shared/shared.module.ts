import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material/checkbox';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { DdapAdminModule } from 'ddap-common-lib';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
  ],
  imports: [
    SharedModule,
    DdapAdminModule,
    NgJsonEditorModule,
    MatButtonToggleModule,
  ],
  exports: [
    SharedModule,
    DdapAdminModule,
    NgJsonEditorModule,
  ],
  providers: [
    { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check-indeterminate' },
  ],
})
export class AdminSharedModule { }
