import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import _get from 'lodash.get';
import _set from 'lodash.set';
import { of } from 'rxjs/internal/observable/of';
import { zip } from 'rxjs/internal/observable/zip';
import { Observable } from 'rxjs/Observable';
import { share, take } from 'rxjs/operators';

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
  access;

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

    const accesses = viewNames.reduce((access, viewName) => {
      const view = _get(resource, `dto.views[${viewName}]`);
      const roles = _get(view, 'roles', {});
      const roleNames = Object.keys(roles);

      const newAccess = roleNames.map((roleName) => `${viewName}/${roleName}`);

      return [...access, ...newAccess];
    }, []);

    zip(this.personas$, of(accesses)).pipe(
      take(1)
    ).subscribe(([personas, views]) => {
      if (resource.dto) {
        const change = personas.reduce((sum, persona) => {
          _set(sum, `modification.testPersonas[${persona}].resources[${this.resource.name}].access`, []);
          return sum;
        }, new ConfigModificationObject(this.resource.dto, {
          dry_run: true,
        }));

        this.resourceService.update(this.resource.name, change)
          .subscribe(
            () => true,
            (dryRunDto) => this.fillInValues(personas, views, dryRunDto));
      }
    });
  }

  hasAccess(persona, access) {
    return _get(this.access, `[${persona}][${access}]`, false);
  }

  fillInValues(personas: string[], views: string[], {error}: any) {
    this.access = personas
      .reduce((accessMatrix, persona) => this.generateAccessMatrix(error, accessMatrix, persona), {});

    this.views = views;
    this.personas = personas;
  }

  private generateAccessMatrix(error, matrix, persona) {
    const accesses = _get(error, `testPersonas[${persona}].resources[${this.resource.name}].access`, []);

    accesses.forEach((access) => {
      _set(matrix, `[${persona}][${access}]`, true);
    });

    return matrix;
  }
}
