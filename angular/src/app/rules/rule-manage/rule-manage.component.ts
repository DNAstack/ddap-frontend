import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RuleService } from '../rule.service';

@Component({
  selector: 'ddap-rule-manage',
  templateUrl: './rule-manage.component.html',
  styleUrls: ['./rule-manage.component.scss'],
})
export class RuleManageComponent implements OnInit {

  rule: any = {};

  constructor(private ruleService: RuleService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(value: any) {
    this.ruleService.save(JSON.parse(value.body))
      .subscribe(() => this.router.navigate(['/rules']));
  }
}