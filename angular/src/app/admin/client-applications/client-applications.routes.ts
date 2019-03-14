import { Routes } from '@angular/router';

import { ClientApplicationDetailComponent } from './client-application-detail/client-application-detail.component';
import { ClientApplicationListComponent } from './client-application-list/client-application-list.component';
import { ClientApplicationManageComponent } from './client-application-manage/client-application-manage.component';

export const CLIENT_APPLICATIONS_ROUTES: Routes = [
  { path: 'client-applications', component: ClientApplicationListComponent },
  { path: 'client-applications/:clientName', component: ClientApplicationDetailComponent },
  { path: 'client-applications/manage/add', component: ClientApplicationManageComponent, pathMatch: 'full' },
];
