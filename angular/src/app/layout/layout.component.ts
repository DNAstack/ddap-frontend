import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import _get from 'lodash/get';

import { IdentityService } from '../identity/identity.service';
import { Profile } from '../identity/profile.model';
import {
  RealmChangeConfirmationDialogComponent
} from '../shared/realm-change-confirmation-dialog/realm-change-confirmation-dialog.component';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {

  profile: Profile = null;
  realm: string;
  realmInputValue: string;
  loginPath: string;

  constructor(public loader: LoadingBarService,
              public dialog: MatDialog,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private identityService: IdentityService) {

  }

  ngOnInit() {
    this.identityService.getProfile().subscribe(profile => {
      this.profile = profile;
    });

    this.activatedRoute.root.firstChild.params.subscribe((params) => {
      this.realm = this.realmInputValue = params.realmId;
      this.loginPath = `/api/v1alpha/${this.realm}/identity/login`;
    });
  }

  goToIdentity() {
    if (confirm('Please sign in again to manage your account')) {
      const loginUrlSuffix = `login?scope=link+account_admin+ga4gh&redirectUri=/${this.realm}/identity`;
      window.location.href = `/api/v1alpha/${this.realm}/identity/${loginUrlSuffix}`;
    }
  }

  isIdentityPage() {
    const currentRoute = _get(this.activatedRoute, 'snapshot.firstChild.url[0].path');
    return currentRoute === 'identity';
  }

  openRealmChangeConfirmationDialog(realm): void {
    const dialogRef = this.dialog.open(RealmChangeConfirmationDialogComponent, {
      data: { realm },
    });
    dialogRef.afterClosed().subscribe(acknowledged => {
      if (!acknowledged) {
        this.realmInputValue = this.realm;
      }
    });
  }

}
