import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import _get from 'lodash.get';
import { of, Subject } from 'rxjs';
import { catchError, debounceTime, switchMap, tap } from 'rxjs/operators';

import { ConfigModificationObject } from '../../../../shared/configModificationObject';
import { EntityModel } from '../../../../shared/entity.model';
import Form from '../../../../shared/form/form';
import { ResourceService } from '../../resources.service';

import { PersonaAccessFormComponent } from './persona-access-form/persona-access-form.component';

@Component({
  selector: 'ddap-persona-resource-access',
  templateUrl: './persona-resource-access.component.html',
  styleUrls: ['./persona-resource-access.component.scss'],
})
export class PersonaResourceAccessComponent implements Form {

  @Input()
  resource: EntityModel;
  @Input()
  isNewResource: boolean;

  @ViewChild(PersonaAccessFormComponent, { static: false })
  personaAccessForm: PersonaAccessFormComponent;
  error: any = null;
  save$: Subject<any> = new Subject();

  constructor(private resourceService: ResourceService,
              private route: ActivatedRoute) {
    this.save$.pipe(
      debounceTime(800),
      switchMap(({changes, isDryRun}) => this.saveResource(changes, isDryRun))
    ).subscribe();
  }

  getApplyModel() {
    return this.personaAccessForm.toApplyDto();
  }

  dryRun(changes?: EntityModel) {
    if (changes) {
      this.resource = changes;
    }
    this.save$.next({ changes, isDryRun: true });
  }

  save(changes: EntityModel) {
    this.save$.next({ changes, isDryRun: false });
  }

  getAllForms(): FormGroup[] {
    return this.personaAccessForm.getAllForms();
  }

  isValid(): boolean {
    return this.personaAccessForm.isValid();
  }

  private saveResource(changes: object, isDryRun = true) {
    const applyModel = this.getApplyModel();

    if (isDryRun) {
      applyModel['dry_run'] = true;
    }

    const change = new ConfigModificationObject(_get(changes, 'dto', this.resource.dto), applyModel);

    const action$ = this.isNewResource
      ? this.resourceService.save(this.routeDamId(), this.resource.name, change)
      : this.resourceService.update(this.routeDamId(), this.resource.name, change);
    return action$.pipe(
      catchError((e) => {
        this.error = e.error;
        this.personaAccessForm.validatePersonaFields(e);

        return of(true);
      }),
      tap((wasError) => {
        if (wasError) {
          return;
        }
        this.error = null;

        if (isDryRun) {
          return this.personaAccessForm.makeFieldsValid();
        }
      })
    );
  }

  private routeDamId() {
    return this.route
      .snapshot
      .paramMap
      .get('damId');
  }
}
