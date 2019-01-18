import {Component, OnInit, ViewChild} from '@angular/core';
import {JsonEditorComponent} from 'ang-jsoneditor';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

import {objectToArray} from '../../shared/util';
import {RuleService} from '../rule.service';

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss'],
})
export class RuleListComponent implements OnInit {

  rules$: Observable<any[]>;
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;

  constructor(private ruleService: RuleService) {
  }

  ngOnInit() {
    this.rules$ = this.ruleService
      .get()
      .pipe(map(objectToArray));
  }

}
