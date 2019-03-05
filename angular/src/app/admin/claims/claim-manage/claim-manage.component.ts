import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ClaimService } from '../claims.service';

@Component({
  selector: 'ddap-claim-manage',
  templateUrl: './claim-manage.component.html',
  styleUrls: ['./claim-manage.component.scss'],
})
export class ClaimManageComponent {

  constructor(private claimService: ClaimService,
              private router: Router) {
  }

  onSubmit(value: any) {
    this.claimService.save(JSON.parse(value.body))
      .subscribe(path => this.router.navigate([path]));
  }
}
