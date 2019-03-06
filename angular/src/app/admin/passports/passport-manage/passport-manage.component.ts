import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PassportService } from '../passports.service';

@Component({
  selector: 'ddap-passport-manage',
  templateUrl: './passport-manage.component.html',
  styleUrls: ['./passport-manage.component.scss'],
})
export class PassportManageComponent {

  constructor(private passportService: PassportService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  onSubmit(value: any) {
    this.passportService.save(JSON.parse(value.body))
      .subscribe(() => this.router.navigate(['../..'], { relativeTo: this.route }));
  }
}
