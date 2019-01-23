import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClaimService } from '../claims.service';

@Component({
  selector: 'ddap-claim-manage',
  templateUrl: './claim-manage.component.html',
  styleUrls: ['./claim-manage.component.scss'],
})
export class ClaimManageComponent implements OnInit {

  claim: any = {};

  constructor(private claimService: ClaimService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(value: any) {
    this.claimService.save(JSON.parse(value.body))
      .subscribe(() => this.router.navigate(['/claims']));
  }
}
