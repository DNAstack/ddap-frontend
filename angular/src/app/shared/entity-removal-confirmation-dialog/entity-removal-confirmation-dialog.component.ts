import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { EntityRemovalConfirmationDialogModel } from './entity-removal-confirmation-dialog.model';

@Component({
  selector: 'ddap-entity-removal-confirmation',
  templateUrl: './entity-removal-confirmation-dialog.component.html',
  styleUrls: ['./entity-removal-confirmation-dialog.component.scss'],
})
export class EntityRemovalConfirmationDialogComponent {

  constructor(public dialogRef: MatDialogRef<EntityRemovalConfirmationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: EntityRemovalConfirmationDialogModel) {
  }

}
