import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flatMap, pluck } from 'rxjs/operators';

import { RuleService } from '../rules.service';

@Component({
  selector: 'ddap-rule-detail',
  templateUrl: './rule-detail.component.html',
  styleUrls: ['./rule-detail.component.scss'],
})
export class RuleDetailComponent implements OnInit {

  rule: any;

  constructor(
    private route: ActivatedRoute,
    public ruleService: RuleService
  ) {}

  ngOnInit() {
    this.route.params.pipe(
      flatMap(params => this.getRule(params['ruleName']))
    ).subscribe(rule => this.rule = rule);
  }

  private getRule(personaName) {
    return this.ruleService.get()
      .pipe(
        pluck(personaName)
      );
  }

}
