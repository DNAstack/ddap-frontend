import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flatMap, pluck } from 'rxjs/operators';

import { RealmService } from '../../../shared/realm.service';
import { GrantService } from '../grants.service';

@Component({
  selector: 'ddap-grant-detail',
  templateUrl: './grant-detail.component.html',
  styleUrls: ['./grant-detail.component.scss'],
})
export class GrantDetailComponent implements OnInit {

  grant: any;

  constructor(
    private route: ActivatedRoute,
    public grantService: GrantService,
    public realmService: RealmService
  ) {}

  ngOnInit() {
    this.route.params.pipe(
      flatMap(params => this.getGrant(params['grantName']))
    ).subscribe(grant => this.grant = grant);
  }

  private getGrant(grantName) {
    return this.grantService.get()
      .pipe(
        pluck(grantName)
      );
  }
}
