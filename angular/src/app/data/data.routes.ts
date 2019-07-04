import { Routes } from '@angular/router';

import { DamIdResolverService } from './dam-id-resolver.service';
import { DataDetailComponent } from './data-detail/data-detail.component';
import { DataListComponent } from './data-list/data-list.component';
import { DataSearchComponent } from './data-search/data-search.component';
import { ResourceResolverService } from './resource-resolver.service';

export const DATA_ROUTES: Routes = [
  {path: 'data', component: DataListComponent},
  {path: 'data/search', component: DataSearchComponent},
  {
    path: 'data/:damId/:resourceName',
    component: DataDetailComponent,
    resolve: {
      resource: ResourceResolverService,
      damId: DamIdResolverService,
    },
  },
];
