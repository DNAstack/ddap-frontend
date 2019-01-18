import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JsonEditorComponent, JsonEditorOptions} from 'ang-jsoneditor';
import {flatMap, pluck} from 'rxjs/operators';

import {JsonEditorDefaults} from '../../shared/jsonEditorDefaults';
import {RuleService} from '../rule.service';

enum ViewState {
  Editing,
  Submitting,
  Viewing,
}

@Component({
  selector: 'app-rule-detail',
  templateUrl: './rule-detail.component.html',
  styleUrls: ['./rule-detail.component.scss'],
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

  ngOnInit() {
    this.route.params.pipe(
      flatMap(params => this.getRule(params['ruleName']))
    ).subscribe((ruleDto) => {
      this.rule = ruleDto;
      this.ruleDto = ruleDto;
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

  private getRule(ruleName) {
    return this.ruleService
      .get()
      .pipe(
        pluck(ruleName)
      );
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
}
