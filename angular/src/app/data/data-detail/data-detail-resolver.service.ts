import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { EntityModel } from '../../admin/shared/entity.model';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root',
})
export class DataDetailResolverService implements Resolve<EntityModel> {

  constructor(private dataService: DataService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EntityModel> | Observable<never> {
    const resourceName = route.paramMap.get('resourceName');
    return this.dataService.getResource(resourceName);
  }
}
