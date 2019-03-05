import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flatMap, pluck } from 'rxjs/operators';

import { ClaimService } from '../claims.service';

@Component({
  selector: 'ddap-claim-detail',
  templateUrl: './claim-detail.component.html',
  styleUrls: ['./claim-detail.component.scss'],
})
export class ClaimDetailComponent implements OnInit {

  claim: any;

  constructor(
    private route: ActivatedRoute,
    public claimService: ClaimService
  ) {}

  ngOnInit() {
    this.route.params.pipe(
      flatMap(params => this.getClaim(params['claimName']))
    ).subscribe(claim => this.claim = claim);
  }

  private getClaim(claimName) {
    return this.claimService.get()
      .pipe(
        pluck(claimName)
      );
  }
}
