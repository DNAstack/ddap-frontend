import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { RealmComponent } from './realm.component';

@NgModule({
  declarations: [
    RealmComponent,
  ],
  imports: [
    SharedModule,
  ],
})
export class RealmModule { }
