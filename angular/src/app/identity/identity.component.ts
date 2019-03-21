import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { IdentityService } from './identity.service';

@Component({
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss'],
})
export class IdentityComponent implements OnInit {

  accounts: any[];
  accountsSubscription: Subscription;

  constructor(private accountService: IdentityService) {

  }

  ngOnInit(): void {
    this.accountsSubscription = this.accountService.get().subscribe((accountDto: any) => {
      this.accounts = accountDto.connectedAccounts;
    });
  }

}
