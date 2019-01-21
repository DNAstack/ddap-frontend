import { Component, OnInit } from '@angular/core';

import { ClaimService } from '../claims.service';

@Component({
  selector: 'app-claim-manage',
  templateUrl: './claim-manage.component.html',
  styleUrls: ['./claim-manage.component.scss'],
})
export class ClaimManageComponent implements OnInit {

  claim: any = {};

  constructor(private claimService: ClaimService) { }

  ngOnInit() {
  }

  onSubmit(value: any) {
    this.claimService.save(JSON.parse(value.body))
      .subscribe(() => this.claim = {});
  }
}
