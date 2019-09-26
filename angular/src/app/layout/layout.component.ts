import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { interval, Observable, zip } from 'rxjs';
import { repeatWhen } from 'rxjs/operators';

import { Identity } from '../identity/identity.model';
import { IdentityService } from '../identity/identity.service';
import { IdentityStore } from '../identity/identity.store';
import { Profile } from '../identity/profile.model';
import { DamInfoService } from '../shared/dam/dam-info.service';
import { DamInfoStore } from '../shared/dam/dam-info.store';
import { DamInfo, DamsInfo } from '../shared/dam/dams-info';

const refreshRepeatTimeoutInMs = 600000;

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {

  isSandbox = false;
  profile: Profile = null;
  isIcAdmin = false;
  realm: string;
  loginPath: string;
  adminDamInfos: DamInfo[] = [];

  constructor(public loader: LoadingBarService,
              private activatedRoute: ActivatedRoute,
              private identityService: IdentityService,
              private identityStore: IdentityStore,
              private damInfoStore: DamInfoStore,
              private damInfoService: DamInfoService) {
  }

  ngOnInit() {
    this.damInfoStore.getDamsInfo();
    zip(this.identityStore.getIdentity(), this.damInfoService.getDamsInfo())
      .subscribe(([{account, accesses, sandbox}, damsInfo]: [Identity, DamsInfo]) => {
        this.isSandbox = sandbox;
        this.profile = account.profile;
        this.isIcAdmin = accesses.find(access => access.target.service === 'IC').isAdmin;
        accesses.filter(access => access.target.service === 'DAM' && access.isAdmin)
          .map(access => access.target.id)
          .forEach(damId => this.adminDamInfos.push(damsInfo[damId]));
      });

    this.activatedRoute.root.firstChild.params.subscribe((params) => {
      this.realm = params.realmId;
      this.loginPath = `/api/v1alpha/${this.realm}/identity/login`;
    });

    // Workaround to get fresh cookies
    this.periodicallyRefreshTokens()
      .subscribe();
  }

  isActivePanel(panelId: string, damId?: string): boolean {
    const adminRoute = this.activatedRoute.firstChild;
    const childRoute = adminRoute.firstChild;
    const damPanelId = 'dam';
    if (panelId === damPanelId &&  childRoute.routeConfig.path === damPanelId) {
      const damIdRouteSnapshot = childRoute.firstChild.snapshot;
      return damIdRouteSnapshot.params.damId === damId;
    }
    const icPanelId = 'identity-concentrator';
    return panelId === icPanelId && childRoute.routeConfig.path === icPanelId;
  }

  logout() {
    this.identityService.invalidateTokens()
      .subscribe(() => {
        window.location.href = `${this.loginPath}`;
      });
  }

  private periodicallyRefreshTokens(): Observable<any> {
    return this.identityService.refreshTokens()
      .pipe(
        repeatWhen(() => interval(refreshRepeatTimeoutInMs))
      );
  }

}
