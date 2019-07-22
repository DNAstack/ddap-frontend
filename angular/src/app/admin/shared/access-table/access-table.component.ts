import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import _get from 'lodash.get';
import _set from 'lodash.set';
import { of } from 'rxjs/internal/observable/of';
import { zip } from 'rxjs/internal/observable/zip';
import { Observable } from 'rxjs/Observable';
import { catchError, share, switchMap, take } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { PersonaService } from '../../personas/personas.service';
import { ResourceService } from '../../resources/resources.service';
import { ConfigModificationObject } from '../configModificationObject';
import { EntityModel } from '../entity.model';

@Component({
  selector: 'ddap-access-table',
  templateUrl: './access-table.component.html',
  styleUrls: ['./access-table.component.scss'],
})
export class AccessTableComponent implements OnChanges {

  @Input()
  resource: EntityModel;

  accessDatatable: any[] = [];
  displayedColumns = [];
  accessList = [];
  viewNameDict = {};

  personasSubscription: Subscription;
  private readonly personas$: Observable<any>;

  constructor(private personaService: PersonaService,
              private resourceService: ResourceService,
              private route: ActivatedRoute) {
    this.personas$ = this.personaService
      .getList(this.routeDamId())
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

    this.viewNameDict = this.buildViewNameDict(resource);

    this.personasSubscription = zip(this.personas$, dryRun$, of(accesses)).pipe(
      take(1)
    ).subscribe(([personas, dryRunDto, views]) => {
      this.setAccessMatrixProperties(personas, views, dryRunDto);
      });
  }

  emptyViews() {
    return Object.keys(this.viewNameDict).length === 0;
  }

  getPersonaName(persona) {
    return _get(persona, 'dto.ui.label', persona.name);
  }

  getViewName(access: string) {
    const viewId = access.split('/')[0];
    return this.viewNameDict[viewId];
  }

  getRole(access: string) {
    return access.split('/')[1];
  }

  setAccessMatrixProperties(personas: EntityModel[], accessList: string[], {error}: any) {
    this.accessDatatable = personas
      .reduce((dataTable, persona) => this.buildAccessMatrix(dataTable, error, persona), []);

    this.accessList = accessList;
    this.displayedColumns = ['persona', ...accessList];
  }

  private buildAccessMatrix(dataTable, error, persona: EntityModel) {
    const row = {
      persona: persona,
    };

    const accesses = _get(error, `testPersonas[${persona.name}].resources[${this.resource.name}].access`, []);
    accesses.forEach((access) => {
      _set(row, `[${access}]`, true);
    });

    dataTable.push(row);
    return dataTable;
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

  private buildViewNameDict(resource: object): object {
    const views = _get(resource, 'dto.views');
    const viewsEntries = views ? Object.entries(views) : [];

    return viewsEntries.reduce((sum, [viewName, viewDto]) => {
      sum[viewName] = _get(viewDto, 'ui.label');
      return sum;
    }, {});
  }

  private dryRun(personas$: Observable<any>): Observable<any> {
    return personas$.pipe(
      switchMap((personas) => {
        const change = personas.reduce((sum, persona: EntityModel) => {
          _set(sum, `modification.testPersonas[${persona.name}].resources[${this.resource.name}].access`, []);
          return sum;
        }, new ConfigModificationObject(this.resource.dto, {
          dry_run: true,
        }));

        return this.resourceService.update(this.routeDamId(), this.resource.name, change);
      }),
      catchError((errorDto) => {
        return of(errorDto);
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
