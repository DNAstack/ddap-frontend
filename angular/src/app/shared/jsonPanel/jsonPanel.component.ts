import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { Observable } from 'rxjs/Observable';

import { EntityService } from '../EntityService';
import { JsonEditorDefaults } from '../jsonEditorDefaults';

enum ViewState {
  Editing,
  Submitting,
  Viewing,
}

@Component({
  selector: 'app-json-panel',
  templateUrl: './json-panel.component.html',
  styleUrls: ['./json-panel.component.scss'],
})
export class JsonPanelComponent implements OnChanges {
  error: string = null;

  @Input()
  useTests = false;

  @Input()
  entity: any;

  entityDto: any;
  testDto: any = {};
  ViewState = ViewState;
  state: ViewState = ViewState.Viewing;

  @ViewChild('entityEditor')
  entityEditor: JsonEditorComponent;

  @ViewChild('testEditor')
  testEditor: JsonEditorComponent;

  editorOptions: JsonEditorOptions | any;

  @Input()
  entityService: EntityService;

  constructor(
  ) {
    this.editorOptions = new JsonEditorDefaults();
  }

  ngOnChanges () {
    this.entityDto = this.entity;
  }

  updateResourceDto(event: any) {
    this.entityDto = event;
  }

  updateTestDto(event: any) {
    this.testDto = event;
  }

  save() {
    this.state = ViewState.Submitting;
    let updateAction: Observable<any>;

    if (this.useTests) {
      updateAction = this.entityService.update(this.entityDto, this.testDto);
    } else {
      updateAction = this.entityService.update(this.entityDto);
    }

    updateAction
      .subscribe(() => {
        this.state = ViewState.Viewing;
        this.setEditorMode('view');
        this.error = null;
      }, e => {
        this.state = ViewState.Editing;
        this.error = e.error;
      });
  }

  cancel() {
    this.state = ViewState.Viewing;
    this.setEditorMode('view');
    this.error = null;
  }

  edit() {
    this.state = ViewState.Editing;
    this.setEditorMode('code');
  }

  private setEditorMode(mode) {
    this.editorOptions.mode = mode;
    this.entityEditor.setOptions(this.editorOptions);
    if (this.ViewState.Editing) {
      this.testEditor.setOptions(this.editorOptions);
    }
  }
}
