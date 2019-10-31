import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { forkJoin, interval, Observable, zip } from 'rxjs';
import { flatMap, repeatWhen } from 'rxjs/operators';

import { IdentityService } from '../identity/identity.service';
import { IdentityStore } from '../identity/identity.store';
import { Profile } from '../identity/profile.model';
import { UserAccess } from '../identity/user-access.model';
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
    this.identityStore.getIdentity()
      .subscribe(({ account, sandbox }) => {
        this.isSandbox = sandbox;
        this.profile = account.profile;
      });

    this.determineAdminAccessForDamAndIc();

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

  private determineAdminAccessForDamAndIc() {
    const damAccess$: Observable<UserAccess[]> = this.damInfoService.getDamInfos()
      .pipe(
        flatMap((dams: DamInfo[]) => forkJoin(dams.map(({ id }) => {
          return this.damInfoService.getDamUserAccess(id);
        })))
      );
    const icAccess$: Observable<UserAccess> = this.identityService.getIcUserAccess();
    zip(damAccess$, icAccess$, this.damInfoService.getDamsInfo())
      .subscribe(([damAccesses, icAccess, damsInfo]: [UserAccess[], UserAccess, DamsInfo]) => {
        this.isIcAdmin = icAccess.isAdmin;
        damAccesses.filter(access => access.isAdmin)
          .map(access => access.damId)
          .forEach(damId => this.adminDamInfos.push(damsInfo[damId]));
      });
  }

  private periodicallyRefreshTokens(): Observable<any> {
    return this.identityService.refreshTokens()
      .pipe(
        repeatWhen(() => interval(refreshRepeatTimeoutInMs))
      );
  }

}
