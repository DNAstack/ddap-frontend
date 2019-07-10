import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import {
  EntityRemovalConfirmationDialogComponent
} from '../../../shared/entity-removal-confirmation-dialog/entity-removal-confirmation-dialog.component';
import { ResourceService } from '../../resources/resources.service';
import { ConfigModificationObject } from '../../shared/configModificationObject';
import { DamEntityDetailBase } from '../../shared/dam-entity-detail.base';
import { EntityModel } from '../../shared/entity.model';
import { FormErrorScrollService } from '../../shared/form-error-scroll.service';
import { PassportIssuerFormComponent } from '../passport-issuer-form/passport-issuer-form.component';
import { PassportIssuerService } from '../passport-issuers.service';

@Component({
  selector: 'ddap-passport-issuer-detail',
  templateUrl: './passport-issuer-detail.component.html',
  styleUrls: ['./passport-issuer-detail.component.scss'],
  providers: [FormErrorScrollService],
})
export class PassportIssuerDetailComponent extends DamEntityDetailBase<PassportIssuerService> {

  @ViewChild(PassportIssuerFormComponent, { static: false })
  passportIssuerForm: PassportIssuerFormComponent;
  @ViewChild('formErrorElement', { static: false })
  formErrorElement: ElementRef;

  constructor(route: ActivatedRoute,
              passportService: PassportIssuerService,
              private resourceService: ResourceService,
              private router: Router,
              public formError: FormErrorScrollService,
              public dialog: MatDialog) {
    super(route, passportService, 'passportName');
  }

  update() {
    if (!this.formError.validate(this.passportIssuerForm, this.formErrorElement)) {
      return;
    }

    const passportIssuer: EntityModel = this.passportIssuerForm.getModel();
    const change = new ConfigModificationObject(passportIssuer.dto, {});
    this.entityService.update(this.routeDamId(), this.entity.name, change)
      .subscribe(this.navigateUp, this.showError);
  }

  delete() {
    this.entityService.remove(this.routeDamId(), this.entity.name)
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
      this.entityService.remove(this.routeDamId(), this.entity.name, change)
        .subscribe(this.navigateUp);
    });
  }

}
