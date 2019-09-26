import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import _get from 'lodash.get';
import { of, Subject } from 'rxjs';
import { catchError, debounceTime, switchMap, tap } from 'rxjs/operators';

import { ConfigModificationObject } from '../../../../shared/configModificationObject';
import { EntityModel } from '../../../../shared/entity.model';
import Form from '../../../../shared/form/form';
import { TestFormComponent } from '../../../shared/test-form/test-form.component';
import { ResourceService } from '../../resources.service';

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

  @ViewChild(TestFormComponent, { static: false })
  testForm: TestFormComponent;
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
    return this.testForm.toApplyDto();
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
    return this.testForm.getAllForms();
  }

  isValid(): boolean {
    return this.testForm.isValid();
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
        this.testForm.validatePersonaFields(e);

        return of(true);
      }),
      tap((wasError) => {
        if (wasError) {
          return;
        }
        this.error = null;

        if (isDryRun) {
          return this.testForm.makeFieldsValid();
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
