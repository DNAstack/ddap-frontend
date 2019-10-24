import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import _get from 'lodash.get';
import { Subscription } from 'rxjs';

import { ClaimDefinitionService } from '../admin/dam-repository/claim-definitions/claim-definitions.service';

import { AccountLink } from './account-link.model';
import { Account } from './account.model';
import { Identity } from './identity.model';
import { IdentityService } from './identity.service';
import { IdentityStore } from './identity.store';
import { identityProviderMetadataExists, identityProviders } from './providers.constants';

@Component({
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss'],
  providers: [ClaimDefinitionService],
})
export class IdentityComponent implements OnInit {

  identity: Identity;
  availableAccounts: AccountLink[];
  availableAccountsSubscription: Subscription;

  realm: string;
  displayScopeWarning = false;

  constructor(private activatedRoute: ActivatedRoute,
              private identityService: IdentityService,
              private identityStore: IdentityStore,
              private claimService: ClaimDefinitionService) {

  }

  ngOnInit(): void {
    this.activatedRoute.root.firstChild.params.subscribe((params) => {
      this.realm = params.realmId;
    });

    this.identityStore.identity
      .subscribe((identity: Identity) => {
        this.identity = identity;
        if (this.hasLinkScope()) {
          this.getAvailableAccounts();
        } else {
          this.displayScopeWarning = true;
        }
      });
    // FIXME: This is workaround to refresh cookies after externalIdp linking
    this.identityService.refreshTokens()
      .subscribe();
  }

  hasExpiringClaims(account: Account): boolean {
    if (!account || !account.passport) {
      return false;
    }

    return Object.entries(account.passport).some(([_, value]: any) => {
      return value.some(this.claimService.isExpiring);
    });
  }

  getProvider(account: Account) {
    return this.isAccountPersona(account)
      ? account.profile.name
      : _get(account, 'identityProvider.ui.label', account.provider);
  }

  getPicture(account: any) {
    const username = _get(account, 'profile.username', account.provider);
    if (this.isAccountPersona(account) && identityProviderMetadataExists(username)) {
      return identityProviders[username].imagePath;
    }

    return _get(account, 'profile.picture', this.getDefaultProviderPicture(username));
  }

  hasLinkScope(): boolean {
    if (!this.identity) {
      return false;
    }
    const { scopes = [] }  = this.identity;
    return scopes.includes('link');
  }

  isAccountPersona(account): boolean {
    return account.provider === '<persona>';
  }

  unlinkConnectedAccount(account: Account): void {
    this.identityService.unlinkConnectedAccount(account);
  }

  redirectToLoginWithLinkScope(): void {
    this.identityStore.getLoginHintForPrimaryAccount()
      .subscribe((loginHint) => {
        window.location.href = `${this.getLoginUrl()}&loginHint=${loginHint}`;
      });
  }

  refreshClaims(account: Account): void {
    window.location.href = `${this.getLoginUrl()}&loginHint=${account.loginHint}`;
  }

  private getLoginUrl(): string {
    const loginUrlSuffix = `login?scope=link+openid+account_admin+ga4gh_passport_v1+identities&redirectUri=/${this.realm}/identity`;
    return `/api/v1alpha/${this.realm}/identity/${loginUrlSuffix}`;
  }

  private getAvailableAccounts() {
    this.identityService.getAccountLinks()
      .subscribe((availableAccounts: AccountLink[]) => {
        this.availableAccounts = availableAccounts;
      });
  }

  private getDefaultProviderPicture(provider: string) {
    return identityProviderMetadataExists(provider)
      ? identityProviders[provider].imagePath
      : identityProviders.defaultImagePath;
  }
}
