import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';

import { RealmService } from '../../../shared/realm.service';
import { ClaimService } from '../claims.service';

@Component({
  selector: 'ddap-claim-manage',
  templateUrl: './claim-manage.component.html',
  styleUrls: ['./claim-manage.component.scss'],
})
export class ClaimManageComponent {

  claim: any = {};

  constructor(private claimService: ClaimService, private router: Router, public realmService: RealmService) { }

  onSubmit(value: any) {
    this.claimService.save(JSON.parse(value.body))
      .pipe(flatMap(_ => this.realmService.underRealm('/claims')))
      .subscribe(path => this.router.navigate([path]));
  }
}
