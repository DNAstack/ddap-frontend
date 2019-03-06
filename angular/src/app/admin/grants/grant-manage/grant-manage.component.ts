import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GrantService } from '../grants.service';

@Component({
  selector: 'ddap-grant-manage',
  templateUrl: './grant-manage.component.html',
  styleUrls: ['./grant-manage.component.scss'],
})
export class GrantManageComponent {

  constructor(private grantService: GrantService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  onSubmit(value: any) {
    this.grantService.save(JSON.parse(value.body))
      .subscribe(() => this.router.navigate(['../..'], { relativeTo: this.route }));
  }
}
