import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { Observable } from 'rxjs/Observable';

import { ChangeModel } from '../change.model';
import { EntityModel } from '../entity.model';
import { EntityService } from '../entity.service';
import { JsonEditorDefaults } from '../jsonEditorDefaults';

enum ViewState {
  Editing,
  Submitting,
  Viewing,
}

@Component({
  selector: 'ddap-json-panel',
  templateUrl: './json-panel.component.html',
  styleUrls: ['./json-panel.component.scss'],
})
export class JsonPanelComponent implements OnChanges {
  error: any = null;

  @Input()
  useTests = false;

  @Input()
  entity: EntityModel;

  entityDto: object;
  testDto: object = {};
  ViewState = ViewState;
  state: ViewState = ViewState.Viewing;

  @ViewChild('entityEditor')
  entityEditor: JsonEditorComponent;

  @ViewChild('testEditor')
  testEditor: JsonEditorComponent;

  @ViewChild('errorEditor')
  errorEditor: JsonEditorComponent;

  entityEditorOptions: JsonEditorOptions;
  testEditorOptions: JsonEditorOptions;
  errorEditorOptions: JsonEditorOptions;

  @Input()
  entityService: EntityService;

  constructor(private router: Router) {
    this.entityEditorOptions = new JsonEditorDefaults();
    this.testEditorOptions = new JsonEditorDefaults();
    this.errorEditorOptions = new JsonEditorDefaults();
    this.testEditorOptions.mode = 'code';
    this.errorEditorOptions.mode = 'code';
    this.errorEditorOptions.onEditable = () => false;
  }

  ngOnChanges () {
    this.entityDto = (this.entity != null) ? this.entity.dto : null;
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

    updateAction = this.entityService.update(new ChangeModel(new EntityModel(this.entity.name, this.entityDto), this.testDto));

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

  remove() {
    this.state = ViewState.Submitting;
    this.entityService.remove(this.entity.name)
      .subscribe(() => {
      const routeToListView = this.router.url.substring(0, this.router.url.lastIndexOf('/'));
        this.router.navigate([routeToListView]);
      }, e => {
        this.state = ViewState.Viewing;
        this.error = e.error;
      });
  }

  private setEditorMode(mode) {
    this.entityEditorOptions.mode = mode;
    this.entityEditor.setOptions(this.entityEditorOptions);
  }
}
