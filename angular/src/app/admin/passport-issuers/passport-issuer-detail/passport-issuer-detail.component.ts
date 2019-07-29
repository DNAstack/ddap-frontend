import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import {
  EntityRemovalConfirmationDialogComponent
} from '../../../shared/entity-removal-confirmation-dialog/entity-removal-confirmation-dialog.component';
import { ConfigModificationObject } from '../../shared/configModificationObject';
import { DamConfigEntityDetailComponentBase } from '../../shared/dam/dam-config-entity-detail-component.base';
import { DamConfigStore } from '../../shared/dam/dam-config.store';
import { EntityModel } from '../../shared/entity.model';
import { FormErrorScrollService } from '../../shared/form-error-scroll.service';
import { PassportIssuerFormComponent } from '../passport-issuer-form/passport-issuer-form.component';
import { PassportIssuerService } from '../passport-issuers.service';
import { PassportIssuersStore } from '../passport-issuers.store';

@Component({
  selector: 'ddap-passport-issuer-detail',
  templateUrl: './passport-issuer-detail.component.html',
  styleUrls: ['./passport-issuer-detail.component.scss'],
  providers: [FormErrorScrollService],
})
export class PassportIssuerDetailComponent extends DamConfigEntityDetailComponentBase<PassportIssuersStore> implements OnInit {

  @ViewChild(PassportIssuerFormComponent, { static: false })
  passportIssuerForm: PassportIssuerFormComponent;
  @ViewChild('formErrorElement', { static: false })
  formErrorElement: ElementRef;

  constructor(protected route: ActivatedRoute,
              protected damConfigStore: DamConfigStore,
              protected passportIssuersStore: PassportIssuersStore,
              private passportIssuerService: PassportIssuerService,
              private router: Router,
              public formError: FormErrorScrollService,
              public dialog: MatDialog) {
    super(route, damConfigStore, passportIssuersStore);
  }

  update() {
    if (!this.formError.validate(this.passportIssuerForm, this.formErrorElement)) {
      return;
    }

    const passportIssuer: EntityModel = this.passportIssuerForm.getModel();
    const change = new ConfigModificationObject(passportIssuer.dto, {});
    this.passportIssuerService.update(this.damId, this.entity.name, change)
      .subscribe(this.navigateUp, this.showError);
  }

  delete() {
    this.passportIssuerService.remove(this.damId, this.entity.name)
      .subscribe(this.navigateUp, this.showError);
  }

  private navigateUp = () => this.router.navigate(['..'], { relativeTo: this.route });

  private showError = ({ error }: HttpErrorResponse) => {
    if (error && ('testPersonas' in error)) {
      this.openEntityRemovalConfirmationDialog(error);
      return;
    }
    const message = (error instanceof Object) ? JSON.stringify(error) : error;
    return this.formError.displayErrorMessage(this.formErrorElement, message);
  }

  private openEntityRemovalConfirmationDialog(accessChange): void {
    const testPersonas = Object.keys(accessChange.testPersonas);
    const dialogRef = this.dialog.open(EntityRemovalConfirmationDialogComponent, {
      data: { testPersonas },
    });
    dialogRef.afterClosed().subscribe(acknowledged => {
      if (!acknowledged) {
        return;
      }
      const change = new ConfigModificationObject(this.passportIssuerForm.getModel().dto, accessChange);
      this.passportIssuerService.remove(this.damId, this.entity.name, change)
        .subscribe(this.navigateUp);
    });
  }

}
