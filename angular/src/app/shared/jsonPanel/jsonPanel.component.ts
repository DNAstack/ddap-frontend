import {Component, Input, OnChanges, ViewChild} from '@angular/core';
import {JsonEditorComponent, JsonEditorOptions} from 'ang-jsoneditor';

import {JsonEditorDefaults} from '../jsonEditorDefaults';

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
  entity: any;

  entityDto: any;
  ViewState = ViewState;
  state: ViewState = ViewState.Viewing;
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;
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

  save() {
    this.state = ViewState.Submitting;
    this.entityService.update(this.entityDto)
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
    this.editor.setOptions(this.editorOptions);
  }
}
