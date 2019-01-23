import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonEditorComponent } from 'ang-jsoneditor';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { objectToArray } from '../../shared/util';
import { ClaimService } from '../claims.service';

@Component({
  selector: 'ddap-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.scss'],
})
export class ClaimListComponent implements OnInit {

  claims$: Observable<any[]>;
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;

  constructor(private claimService: ClaimService) {
  }

  ngOnInit() {
    this.claims$ = this.claimService.get()
      .pipe(
        map(objectToArray));
  }

}
