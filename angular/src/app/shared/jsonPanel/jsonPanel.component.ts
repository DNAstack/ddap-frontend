import {Component, Input, OnInit, ViewChild} from '@angular/core';
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
export class JsonPanelComponent implements OnInit {
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

  ngOnInit() {
  }

  updateResourceDto(event: any) {
    this.entityDto = event;
  }

  save() {
    this.state = ViewState.Submitting;
    this.entityService.update(this.entityDto)
      .subscribe(_ => {
        this.setEditorMode('view');
        this.state = ViewState.Viewing;
        this.error = null;
      }, e => {
        this.error = e.error;
        this.state = ViewState.Editing;
      });
  }

  cancel() {
    this.setEditorMode('view');
    this.error = null;

    switch (this.state) {
      case ViewState.Editing: {
        this.state = ViewState.Viewing;
        return;
      }
    }
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
