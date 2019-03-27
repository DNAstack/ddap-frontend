import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Account } from './account.model';
import { Identity } from './identity.model';
import { IdentityService } from './identity.service';
import { LoginLink } from './login-link.model';
import { personaMetadataExists, personas } from './personas.constants';

@Component({
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss'],
})
export class IdentityComponent implements OnInit {

  accounts: Account[];
  accountsSubscription: Subscription;

  identityProviderLinks: LoginLink[];
  identityProvidersSubscription: Subscription;

  constructor(private identityService: IdentityService) {

  }

  ngOnInit(): void {
    this.accountsSubscription = this.identityService.getIdentity()
      .subscribe((identity: Identity) => {
        this.accounts = identity.connectedAccounts;
      });

    this.identityProvidersSubscription = this.identityService.getIdentityProviderLoginLinks()
      .subscribe((links: LoginLink[]) => {
      this.identityProviderLinks = links;
    });
  }

  getProvider(account: Account) {
    return this.isAccountPersona(account)
      ? account.profile.name
      : account.provider;
  }

  getPicture(account: Account) {
    const username = account.profile.username;
    if (this.isAccountPersona(account) && personaMetadataExists(username)) {
      return personas[username].imagePath;
    }

    return account.profile.picture || '/assets/images/placeholder_identity.png';
  }

  private isAccountPersona(account): boolean {
    return account.provider === '<persona>';
  }

}
