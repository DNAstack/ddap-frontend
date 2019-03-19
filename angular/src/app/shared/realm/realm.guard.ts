import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { RealmService } from './realm.service';

@Injectable({
  providedIn: 'root',
})
export class RealmGuard implements CanActivate {

  constructor(private realmService: RealmService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.realmService.realmSnapshot = route.params.realmId;
    return true;
  }
}
