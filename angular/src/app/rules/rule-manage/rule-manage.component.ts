import { Component, OnInit } from '@angular/core';

import { RuleService } from '../rule.service';

@Component({
  selector: 'app-rule-manage',
  templateUrl: './rule-manage.component.html',
  styleUrls: ['./rule-manage.component.scss'],
})
export class RuleManageComponent implements OnInit {

  rule: any = {};

  constructor(private ruleService: RuleService) { }

  ngOnInit() {
  }

  onSubmit(value: any) {
    this.ruleService.save(JSON.parse(value.body))
      .subscribe(() => this.rule = {});
  }
}
