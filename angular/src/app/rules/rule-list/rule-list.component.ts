import {Component, OnInit, ViewChild} from '@angular/core';
import { Observable } from 'rxjs';

import { RuleService } from '../rule.service';
import {JsonEditorComponent, JsonEditorOptions} from 'ang-jsoneditor';
import {JsonEditorDefaults} from '../../shared/jsonEditorDefaults';
import {map} from "rxjs/operators";
import {objectToArray} from "../../shared/util";

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss']
})
export class RuleListComponent implements OnInit {

  rules$: Observable<any[]>;
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;
  editorOptions: JsonEditorOptions | any;

  constructor(private ruleService: RuleService) {
    this.editorOptions = new JsonEditorDefaults();
  }

  ngOnInit() {
    this.rules$ = this.ruleService
      .get()
      .pipe(map(objectToArray));
  }

}
