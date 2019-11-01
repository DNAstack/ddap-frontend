import { Component, Input, OnInit } from '@angular/core';
import { EntityModel } from 'ddap-common-lib';
import _get from 'lodash.get';
import { Observable } from 'rxjs';

import { flatten } from '../../../../shared/util';
import { PersonasStore } from '../../personas/personas.store';

import { ViewRole } from './view-role.model';

@Component({
  selector: 'ddap-personas-access-table',
  templateUrl: './personas-access-table.component.html',
  styleUrls: ['./personas-access-table.component.scss'],
})
export class PersonasAccessTableComponent implements OnInit {

  @Input()
  damId: string;
  @Input()
  resource: EntityModel;

  displayedColumns: string[] = ['persona'];
  personas$: Observable<EntityModel[]>;
  viewRoles: ViewRole[];

  constructor(private personasStore: PersonasStore) {

  }

  ngOnInit(): void {
    this.personas$ = this.personasStore.getAsList(this.damId);
    this.viewRoles = this.getViewRoles(this.resource.dto.views);

    this.displayColumns();
  }

  hasAccess(persona: EntityModel, viewRole: ViewRole): boolean {
    const access: string[] = _get(persona, 'dto.access', []);
    return access.includes(`${this.resource.name}/${viewRole.viewRoleId}`);
  }

  private displayColumns() {
    this.viewRoles
      .forEach((viewRole: ViewRole) => this.displayedColumns.push(viewRole.viewRoleId));
  }

  private getViewRoles(views): ViewRole[] {
    return flatten(Object.entries(views)
      .map(([viewId, view]) => {
        const roles = this.getRolesForViews(view);
        return roles.map((role) => {
          return {
            view,
            role,
            viewRoleId: `${viewId}/${role}`,
          };
        });
      }));
  }

  private getRolesForViews = (view): string[] => Object.keys(view.roles);

}
