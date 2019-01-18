import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {JsonEditorDefaults} from '../../shared/jsonEditorDefaults'
import {flatMap, pluck} from "rxjs/operators";
import {JsonEditorComponent, JsonEditorOptions} from "ang-jsoneditor";
import {ClientService} from "../client.service";

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
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;
  editorOptions: JsonEditorOptions | any;

  constructor(
    private route: ActivatedRoute,
    public clientService: ClientService
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
}
