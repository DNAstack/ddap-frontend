import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PassportIssuerService } from '../passport-issuerss.service';

@Component({
  selector: 'ddap-passport-issuer-manage',
  templateUrl: './passport-issuer-manage.component.html',
  styleUrls: ['./passport-issuer-manage.component.scss'],
})
export class PassportIssuerManageComponent {

  constructor(private passportService: PassportIssuerService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  add(id, change) {
    this.passportService.save(id, change)
      .subscribe(() => this.router.navigate(['../..'], { relativeTo: this.route }));
  }
}
