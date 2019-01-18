import {Component, OnInit, ViewChild} from '@angular/core';
import {JsonEditorComponent, JsonEditorOptions} from 'ang-jsoneditor';
import { Observable } from 'rxjs/Observable';
import {map} from 'rxjs/operators';

import {JsonEditorDefaults} from '../../shared/jsonEditorDefaults';
import {objectToArray} from '../../shared/util';
import {ClientService} from '../client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
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
