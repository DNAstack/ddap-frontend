import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { nameConstraintPattern } from 'ddap-common-lib';

import { RealmChangeConfirmationDialogComponent } from '../realm-change-confirmation-dialog/realm-change-confirmation-dialog.component';

@Component({
  selector: 'ddap-realm-input',
  templateUrl: './realm-input.component.html',
  styleUrls: ['./realm-input.component.scss'],
})
export class RealmInputComponent implements OnInit {

  realm: string;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog) {

  }

  ngOnInit() {
    this.activatedRoute.root.firstChild.params.subscribe((params) => {
      this.realm = params.realmId;
      this.form = this.formBuilder.group({
        realm: [this.realm, [Validators.pattern(nameConstraintPattern)]],
      });
    });
  }

  openRealmChangeConfirmationDialog(): void {
    if (this.form.invalid) {
      return;
    }

    const dialogRef = this.dialog.open(RealmChangeConfirmationDialogComponent, {
      data: { realm: this.form.get('realm').value },
    });
    dialogRef.afterClosed().subscribe(acknowledged => {
      if (!acknowledged) {
        this.form.setValue({ realm: this.realm });
      }
    });
  }

}
