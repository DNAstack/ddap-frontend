import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class DataResolverService implements Resolve<any> {

  constructor(private dataService: DataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    const resourceName = route.paramMap.get('resourceName');
    const realmId = route.root.firstChild.params.realmId;
    return this.dataService.getResource(resourceName, realmId);
  }
}
