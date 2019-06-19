import { Component, OnInit } from '@angular/core';
import GA4GHClaim = dam.v1.TestPersona.GA4GHClaim;
import { ActivatedRoute } from '@angular/router';
import _get from 'lodash.get';
import { Subscription } from 'rxjs/Subscription';

import { ClaimDefinitionService } from '../admin/claim-definitions/claim-definitions.service';
import { dam } from '../shared/proto/dam-service';

import { AccountLink } from './account-link.model';
import { Account } from './account.model';
import { Identity } from './identity.model';
import { IdentityService } from './identity.service';
import { identityProviderMetadataExists, identityProviders } from './providers.constants';

@Component({
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss'],
  providers: [ClaimDefinitionService],
})
export class IdentityComponent implements OnInit {

  identity: Identity;
  identitySubscription: Subscription;
  availableAccounts: AccountLink[];
  availableAccountsSubscription: Subscription;

  realm: string;
  displayScopeWarning = false;

  constructor(private activatedRoute: ActivatedRoute,
              private identityService: IdentityService,
              private claimService: ClaimDefinitionService) {

  }

  ngOnInit(): void {
    this.activatedRoute.root.firstChild.params.subscribe((params) => {
      this.realm = params.realmId;
    });

    this.identitySubscription = this.identityService.getIdentity()
      .subscribe((identity: Identity) => {
        this.identity = identity;
        if (this.hasLinkScope()) {
          this.getAvailableAccounts();
        } else {
          this.displayScopeWarning = true;
        }
      });
  }

  hasExpiringClaims(account: Account): boolean {
    if (!account || !account.claims) {
      return false;
    }

    return Object.entries(account.claims).some(([_, value]: any) => {
      return value.list.some(this.claimService.isExpiring);
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

  mapToGa4ghClaims(claims): GA4GHClaim[] {
    return this.flatten(
      Object.entries(claims)
        .map(([key, value]: any) => this.extractClaimsUnderKey(key, value.list))
    );
  }

  unlinkConnectedAccount(account: Account): void {
    this.identityService.unlinkConnectedAccount(account);
  }

  redirectToLoginWithLinkScope(): void {
    const loginUrlSuffix = `login?scope=link+openid+account_admin+ga4gh+identities&redirectUri=/${this.realm}/identity`;
    window.location.href = `/api/v1alpha/${this.realm}/identity/${loginUrlSuffix}`;
  }

  refreshClaims(account: Account) {

  }

  private getAvailableAccounts() {
    this.identityService.getAccountLinks()
      .subscribe((availableAccounts: AccountLink[]) => {
        this.availableAccounts = availableAccounts;
      });
  }

  private extractClaimsUnderKey(claimKey: string, claims: any[]): GA4GHClaim[] {
    return claims.map((claim) => {
      claim.claimName = claimKey;
      return GA4GHClaim.fromObject(claim);
    });
  }

  private flatten = (array) => array.reduce((acc, val) => acc.concat(val), []);

  private getDefaultProviderPicture(provider: string) {
    return identityProviderMetadataExists(provider)
      ? identityProviders[provider].imagePath
      : identityProviders.defaultImagePath;
  }
}
