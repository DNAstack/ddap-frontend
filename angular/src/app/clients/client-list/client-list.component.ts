import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';

import {JsonEditorComponent, JsonEditorOptions} from "ang-jsoneditor";
import {JsonEditorDefaults} from "../../shared/jsonEditorDefaults";
import {ClientService} from "../client.service";
import {map} from "rxjs/operators";
import {objectToArray} from "../../shared/util";

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  clients$: Observable<any[]>;
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;
  editorOptions: JsonEditorOptions | any;

  constructor(private clientService: ClientService) {
    this.editorOptions = new JsonEditorDefaults();
  }

  ngOnInit() {
    this.clients$ = this.clientService
      .get()
      .pipe(map(objectToArray));
  }
}
