import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';

import { RealmService } from '../../../shared/realm.service';
import { GrantService } from '../grants.service';

@Component({
  selector: 'ddap-grant-manage',
  templateUrl: './grant-manage.component.html',
  styleUrls: ['./grant-manage.component.scss'],
})
export class GrantManageComponent {

  grant: any = {};

  constructor(private grantService: GrantService, private router: Router, public realmService: RealmService) { }

  onSubmit(value: any) {
    this.grantService.save(JSON.parse(value.body))
      .pipe(flatMap(_ => this.realmService.underRealm('/grants')))
      .subscribe(path => this.router.navigate([path]));
  }
}
