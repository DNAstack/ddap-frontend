import { Component, OnInit } from '@angular/core';
import _get from 'lodash.get';
import { Subscription } from 'rxjs/Subscription';

import { AccountLink } from './account-link.model';
import { Account } from './account.model';
import { Identity } from './identity.model';
import { IdentityService } from './identity.service';
import { identityProviderMetadataExists, identityProviders } from './providers.constants';

@Component({
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss'],
})
export class IdentityComponent implements OnInit {

  connectedAccounts: Account[];
  connectedAccountsSubscription: Subscription;

  availableAccounts: AccountLink[];
  availableAccountsSubscription: Subscription;

  constructor(private identityService: IdentityService) {

  }

  ngOnInit(): void {
    this.connectedAccountsSubscription = this.identityService.getIdentity()
      .subscribe((identity: Identity) => {
        this.connectedAccounts = identity.connectedAccounts;
      });

    this.availableAccountsSubscription = this.identityService.getAccountLinks()
      .subscribe((availableAccounts: AccountLink[]) => {
        this.availableAccounts = availableAccounts;
      });
  }

  getProvider(account: Account) {
    return this.isAccountPersona(account)
      ? account.profile.name
      : _get(account, 'identityProvider.ui.label', account.provider);
  }

  getPicture(account: Account) {
    const username = _get(account, 'profile.username', account.provider);
    if (this.isAccountPersona(account) && identityProviderMetadataExists(username)) {
      return identityProviders[username].imagePath;
    }

    return _get(account, 'profile.picture', this.getDefaultProviderPicture(username));
  }

  isAccountPersona(account): boolean {
    return account.provider === '<persona>';
  }

  private getDefaultProviderPicture(provider: string) {
    return identityProviderMetadataExists(provider)
      ? identityProviders[provider].imagePath
      : '/assets/images/placeholder_identity.png';
  }

}
