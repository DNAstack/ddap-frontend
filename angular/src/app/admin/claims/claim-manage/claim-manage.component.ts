import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ClaimService } from '../claims.service';

@Component({
  selector: 'ddap-claim-manage',
  templateUrl: './claim-manage.component.html',
  styleUrls: ['./claim-manage.component.scss'],
})
export class ClaimManageComponent {

  constructor(private claimService: ClaimService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  onSubmit(value: any) {
    this.claimService.save(JSON.parse(value.body))
      .subscribe(() => this.router.navigate(['../..'], { relativeTo: this.route }));
  }
}
