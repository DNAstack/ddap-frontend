import { NgModule } from '@angular/core';
import { NgJsonEditorModule } from 'ang-jsoneditor';

import { SharedModule } from '../shared/shared.module';

import { IdentityComponent } from './identity.component';

@NgModule({
  declarations: [
    IdentityComponent,
  ],
  imports: [
    SharedModule,

    NgJsonEditorModule,
  ],
})
export class IdentityModule { }
