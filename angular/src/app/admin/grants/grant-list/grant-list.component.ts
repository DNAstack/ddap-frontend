import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonEditorComponent } from 'ang-jsoneditor';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { objectToArray } from '../../../shared/util';
import { GrantService } from '../grants.service';

@Component({
  selector: 'ddap-grant-list',
  templateUrl: './grant-list.component.html',
  styleUrls: ['./grant-list.component.scss'],
})
export class GrantListComponent implements OnInit {

  grants$: Observable<any[]>;
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;

  constructor(private grantService: GrantService) {
  }

  ngOnInit() {
    this.grants$ = this.grantService.get()
      .pipe(
        map(objectToArray));
  }

}
