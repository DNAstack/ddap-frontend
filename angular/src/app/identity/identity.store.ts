import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { Account } from './account.model';
import { Identity } from './identity.model';
import { IdentityService } from './identity.service';

@Injectable({
  providedIn: 'root',
})
export class IdentityStore {

  private _identity: ReplaySubject<Identity> = new ReplaySubject(1);
  // tslint:disable-next-line:member-ordering
  public readonly identity: Observable<Identity> = this._identity.asObservable();

  constructor(private identityService: IdentityService) {
  }

  getIdentity(): Observable<Identity> {
    this.identityService.getIdentity()
      .subscribe((identity: Identity) => this._identity.next(identity));
    return this.identity;
  }

  getLoginHintForPrimaryAccount(): Observable<string> {
    return this.identity
      .pipe(
        pluck('account'),
        map((account: any) => {
          const username = account.profile.username;
          const primaryAccount = account.connectedAccounts.find((connectedAccount: Account) => {
            return connectedAccount.profile.username === username;
          });
          return primaryAccount.loginHint;
        })
      );
  }

}
