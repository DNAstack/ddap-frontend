import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Account } from './account.model';
import { Identity } from './identity.model';
import { IdentityService } from './identity.service';
import { personas } from './personas.const';

@Component({
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss'],
})
export class IdentityComponent implements OnInit {

  accounts: Account[];
  accountsSubscription: Subscription;

  constructor(private identityService: IdentityService) {

  }

  ngOnInit(): void {
    this.accountsSubscription = this.identityService.getIdentity()
      .subscribe((identity: Identity) => {
        this.accounts = identity.connectedAccounts;
      });
  }

  getProvider(account: Account) {
    return this.isAccountPersona(account)
      ? account.profile.name
      : account.provider;
  }

  getPicture(account: Account) {
    if (this.isAccountPersona(account)) {
      return personas[account.profile.username].imagePath;
    }

    return account.profile.picture
      ? account.profile.picture
      : '/assets/images/placeholder_identity.png';
  }

  private isAccountPersona(account): boolean {
    return account.provider === '<persona>';
  }

}
