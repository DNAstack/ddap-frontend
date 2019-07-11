import { NgModule } from '@angular/core';

import { AdminSharedModule } from '../shared/shared.module';

import { TrustedSourcesDetailComponent } from './trusted-sources-detail/trusted-sources-detail.component';
import { TrustedSourcesFormComponent } from './trusted-sources-form/trusted-sources-form.component';
import { TrustedSourcesListComponent } from './trusted-sources-list/trusted-sources-list.component';
import { TrustedSourcesManageComponent } from './trusted-sources-manage/trusted-sources-manage.component';

@NgModule({
  declarations: [
    TrustedSourcesListComponent,
    TrustedSourcesManageComponent,
    TrustedSourcesDetailComponent,
    TrustedSourcesFormComponent,
  ],
  imports: [
    AdminSharedModule,
  ],
})
export class TrustedSourcesModule { }
