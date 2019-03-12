import { Routes } from '@angular/router';

import { TrustedSourcesDetailComponent } from './trusted-sources-detail/trusted-sources-detail.component';
import { TrustedSourcesListComponent } from './trusted-sources-list/trusted-sources-list.component';
import { TrustedSourcesManageComponent } from './trusted-sources-manage/trusted-sources-manage.component';

export const TRUSTED_SOURCES_ROUTES: Routes = [
  { path: 'trusted-sources', component: TrustedSourcesListComponent },
  { path: 'trusted-sources/:trustedSourceName', component: TrustedSourcesDetailComponent },
  { path: 'trusted-sources/manage/add', component: TrustedSourcesManageComponent, pathMatch: 'full' },
];
