import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonEditorComponent } from 'ang-jsoneditor';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { objectToArray } from '../../../shared/util';
import { ClientService } from '../clients.service';

@Component({
  selector: 'ddap-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit {

  clients$: Observable<any[]>;
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;

  constructor(private clientService: ClientService) {
  }

  ngOnInit() {
    this.clients$ = this.clientService.get()
      .pipe(
        map(objectToArray));
  }

}
