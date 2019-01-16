import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ClientService} from '../client.service';
import {JsonEditorDefaults} from '../../shared/jsonEditorDefaults'
import {flatMap, pluck} from "rxjs/operators";
import {JsonEditorComponent, JsonEditorOptions} from "ang-jsoneditor";

enum ViewState {
  Editing,
  Submitting,
  Viewing
}

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {

  error: string = null;
  // An actual resource from the server
  client: any;
  // A (possible edited) resource from the json editor.
  clientDto: any;
  views: any;
  state: ViewState = ViewState.Viewing;
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;
  editorOptions: JsonEditorOptions | any;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService
  ) {
    this.editorOptions = new JsonEditorDefaults();
  }

  private getClient(clientName) {
    console.log('clientName', clientName);
    return this.clientService
      .get()
      .pipe(
        pluck(clientName)
      )
  }

  ngOnInit() {
    this.route.params.pipe(
      flatMap(params => this.getClient(params['clientName']))
    ).subscribe((clientDto) => {
     console.log('this.route.params[\'clientName\']', this.route.params);
     console.log('clientDto', clientDto);
      this.client = clientDto;
      this.clientDto = clientDto;
    });
  }

  private setEditorMode(mode) {
    this.editorOptions.mode = mode;
    this.editor.setOptions(this.editorOptions);
  }

  private save(): void {
    this.state = ViewState.Submitting;
    this.clientService.update(this.clientDto)
    .subscribe(_ => {
      this.setEditorMode('view');
      this.state = ViewState.Viewing;
      this.error = null;
    }, e => {
      this.error = e.error;
      this.state = ViewState.Editing;
    });
  }

  updateResourceDto(event : any) {
    this.clientDto = event;
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
