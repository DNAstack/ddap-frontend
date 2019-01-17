import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {RuleService} from '../rule.service';
import {JsonEditorDefaults} from '../../shared/jsonEditorDefaults';
import {flatMap, pluck} from 'rxjs/operators';
import {JsonEditorComponent, JsonEditorOptions} from 'ang-jsoneditor';

enum ViewState {
  Editing,
  Submitting,
  Viewing
}

@Component({
  selector: 'app-rule-detail',
  templateUrl: './rule-detail.component.html',
  styleUrls: ['./rule-detail.component.scss']
})
export class RuleDetailComponent implements OnInit {

  error: string = null;
  // An actual resource from the server
  rule: any;
  // A (possible edited) resource from the json editor.
  ruleDto: any;
  views: any;
  state: ViewState = ViewState.Viewing;
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;
  editorOptions: JsonEditorOptions | any;

  constructor(
    private route: ActivatedRoute,
    private ruleService: RuleService
  ) {
    this.editorOptions = new JsonEditorDefaults();
  }

  private getRule(ruleName) {
    console.log('ruleName', ruleName);
    return this.ruleService
      .get()
      .pipe(
        pluck(ruleName)
      );
  }

  ngOnInit() {
    this.route.params.pipe(
      flatMap(params => this.getRule(params['ruleName']))
    ).subscribe((ruleDto) => {
     console.log('this.route.params[\'ruleName\']', this.route.params);
     console.log('ruleDto', ruleDto);
      this.rule = ruleDto;
      this.ruleDto = ruleDto;
    });
  }

  private setEditorMode(mode) {
    this.editorOptions.mode = mode;
    this.editor.setOptions(this.editorOptions);
  }

  private save(): void {
    this.state = ViewState.Submitting;
    this.ruleService.update(this.ruleDto)
    .subscribe(_ => {
      this.setEditorMode('view');
      this.state = ViewState.Viewing;
      this.error = null;
    }, e => {
      this.error = e.error;
      this.state = ViewState.Editing;
    });
  }

  updateRuleDto(event: any) {
    this.ruleDto = event;
  }

  isStateView(): boolean {
    return this.state !== ViewState.Viewing;
  }

  edit(): void {
    this.state = ViewState.Editing;
    this.setEditorMode('code');
  }

  cancel(): void {
    this.setEditorMode('view');
    this.error = null;

    switch (this.state) {
      case ViewState.Editing: {
        this.state = ViewState.Viewing;
        return;
      }
    }
  }

  isStateSubmit(): boolean {
    return this.state === ViewState.Submitting;
  }
}
