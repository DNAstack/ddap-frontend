import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import _get from 'lodash.get';
import _set from 'lodash.set';
import { of } from 'rxjs/internal/observable/of';
import { zip } from 'rxjs/internal/observable/zip';
import { Observable } from 'rxjs/Observable';
import { catchError, share, switchMap, take } from 'rxjs/operators';

import { pick } from '../../../shared/autocomplete/autocomplete.util';
import { PersonaService } from '../../personas/personas.service';
import { ResourceService } from '../../resources/resources.service';
import { ConfigModificationObject } from '../configModificationObject';

@Component({
  selector: 'ddap-access-table',
  templateUrl: './access-table.component.html',
  styleUrls: ['./access-table.component.scss'],
})
export class AccessTableComponent implements OnChanges {

  @Input()
  resource: any;

  views: string[];
  personas: string[];
  accessMatrix;

  private personas$: Observable<any>;

  constructor(private personaService: PersonaService,
              private resourceService: ResourceService) {
    this.personas$ = this.personaService
      .getList(pick('name'))
      .pipe(
        share()
      );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const resource = changes.resource.currentValue;
    const resourceViews = _get(resource, 'dto.views', {});
    const viewNames = Object.keys(resourceViews);
    const accesses = this.buildAccessList(viewNames, resource);
    const dryRun$ = this.dryRun(this.personas$);

    zip(this.personas$, dryRun$, of(accesses)).pipe(
      take(1)
    ).subscribe(([personas, dryRunDto, views]) => {
      // console.log('test', test);
      this.setAccessMatrixProperties(personas, views, dryRunDto);
      });
  }

  hasAccess(persona, access) {
    return _get(this.accessMatrix, `[${persona}][${access}]`, false);
  }

  setAccessMatrixProperties(personas: string[], views: string[], {error}: any) {
    this.accessMatrix = personas
      .reduce((accessMatrix, persona) => this.buildAccessMatrix(error, accessMatrix, persona), {});

    this.views = views;
    this.personas = personas;
  }

  private buildAccessMatrix(error, matrix, persona) {
    const accesses = _get(error, `testPersonas[${persona}].resources[${this.resource.name}].access`, []);

    accesses.forEach((access) => {
      _set(matrix, `[${persona}][${access}]`, true);
    });

    return matrix;
  }

  private buildAccessList(viewNames, resource): string[] {
    return viewNames.reduce((access, viewName) => {
      const view = _get(resource, `dto.views[${viewName}]`);
      const roles = _get(view, 'roles', {});
      const roleNames = Object.keys(roles);

      const newAccess = roleNames.map((roleName) => `${viewName}/${roleName}`);

      return [...access, ...newAccess];
    }, []);
  }

  private dryRun(personas$: Observable<any>): Observable<any> {
    return personas$.pipe(
      switchMap((personas) => {
        const change = personas.reduce((sum, persona) => {
          _set(sum, `modification.testPersonas[${persona}].resources[${this.resource.name}].access`, []);
          return sum;
        }, new ConfigModificationObject(this.resource.dto, {
          dry_run: true,
        }));

        return this.resourceService.update(this.resource.name, change);
      }),
      catchError((e) => {
        return of(e);
      })
    );
  }
}
