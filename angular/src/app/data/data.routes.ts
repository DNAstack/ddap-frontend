import { Routes } from '@angular/router';

import { DataDetailComponent } from './data-detail/data-detail.component';
import { DataListComponent } from './data-list/data-list.component';
import { DataResolverService } from './data-resolver.service';
import { DataSearchComponent } from './data-search/data-search.component';

export const DATA_ROUTES: Routes = [
  {path: 'data/:damId', component: DataListComponent},
  {path: 'data/:damId/search', component: DataSearchComponent},
  {
    path: 'data/:damId/:resourceName',
    component: DataDetailComponent,
    resolve: {
      resource: DataResolverService,
    },
  },
];
