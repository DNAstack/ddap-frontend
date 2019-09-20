import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { IdentityStore } from '../../../identity/identity.store';

import { RealmChangeConfirmationDialogModel } from './realm-change-confirmation-dialog.model';

@Component({
  selector: 'ddap-realm-change-confirmation',
  templateUrl: './realm-change-confirmation-dialog.component.html',
  styleUrls: ['./realm-change-confirmation-dialog.component.scss'],
})
export class RealmChangeConfirmationDialogComponent {

  constructor(public dialogRef: MatDialogRef<RealmChangeConfirmationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: RealmChangeConfirmationDialogModel,
              private identityStore: IdentityStore) {
    dialogRef.afterClosed().subscribe(acknowledged => {
      if (acknowledged) {
        this.changeRealmAndGoToLogin();
      }
    });
  }

  private changeRealmAndGoToLogin() {
    this.identityStore.getLoginHintForPrimaryAccount()
      .subscribe((loginHint) => {
        window.location.href = `/api/v1alpha/${this.data.realm}/identity/login?loginHint=${loginHint}`;
      });
  }

}
