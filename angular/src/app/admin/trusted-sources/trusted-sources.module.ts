import { NgModule } from '@angular/core';

import { AdminSharedModule } from '../shared/shared.module';

import { TrustedSourcesDetailComponent } from './trusted-sources-detail/trusted-sources-detail.component';
import { TrustedSourcesListComponent } from './trusted-sources-list/trusted-sources-list.component';
import { TrustedSourcesManageComponent } from './trusted-sources-manage/trusted-sources-manage.component';

@NgModule({
  declarations: [
    TrustedSourcesListComponent,
    TrustedSourcesManageComponent,
    TrustedSourcesDetailComponent,
  ],
  imports: [
    AdminSharedModule,
  ],
})
export class TrustedSourcesModule { }
