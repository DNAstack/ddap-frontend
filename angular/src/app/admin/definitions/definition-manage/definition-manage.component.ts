import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';

import { RealmService } from '../../../shared/realm.service';
import { DefinitionService } from '../definitions.service';

@Component({
  selector: 'ddap-definition-manage',
  templateUrl: './definition-manage.component.html',
  styleUrls: ['./definition-manage.component.scss'],
})
export class DefinitionManageComponent {

  definition: any = {};

  constructor(private definitionService: DefinitionService, private router: Router, private realmService: RealmService) { }

  onSubmit(value: any) {
    this.definitionService.save(JSON.parse(value.body))
      .pipe(flatMap(_ => this.realmService.underRealm('/definitions')))
      .subscribe(path => this.router.navigate([path]));
  }
}
