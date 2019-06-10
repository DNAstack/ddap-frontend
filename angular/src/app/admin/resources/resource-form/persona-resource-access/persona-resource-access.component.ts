import { Component, Input, ViewChild } from '@angular/core';
import _get from 'lodash.get';
import { of } from 'rxjs/internal/observable/of';
import { catchError, debounceTime, switchMap, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { ConfigModificationObject } from '../../../shared/configModificationObject';
import { EntityModel } from '../../../shared/entity.model';
import { TestFormComponent } from '../../../shared/test-form/test-form.component';
import { ResourceService } from '../../resources.service';

@Component({
  selector: 'ddap-persona-resource-access',
  templateUrl: './persona-resource-access.component.html',
  styleUrls: ['./persona-resource-access.component.scss'],
})
export class PersonaResourceAccessComponent {

  @Input()
  resource: EntityModel;
  @Input()
  isNewResource: boolean;

  @ViewChild(TestFormComponent)
  testForm: TestFormComponent;
  error: any = null;
  save$: Subject<any> = new Subject();

  private saveSubscription;

  constructor(private resourceService: ResourceService) {
    this.saveSubscription = this.save$.pipe(
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

  private saveResource(changes: object, isDryRun = true) {
    const applyModel = this.getApplyModel();

    if (isDryRun) {
      applyModel['dry_run'] = true;
    }

    const change = new ConfigModificationObject(_get(changes, 'dto', this.resource.dto), applyModel);

    const action$ = this.isNewResource
      ? this.resourceService.save(this.resource.name, change)
      : this.resourceService.update(this.resource.name, change);
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
}
