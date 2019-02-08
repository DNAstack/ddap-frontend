import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { objectToArray } from '../../../shared/util';
import { DefinitionService } from '../definitions.service';

@Component({
  selector: 'ddap-definition-list',
  templateUrl: './definition-list.component.html',
  styleUrls: ['./definition-list.component.scss'],
})
export class DefinitionListComponent implements OnInit {

  definitions$: Observable<any[]>;

  constructor(private definitionService: DefinitionService) {
  }

  ngOnInit() {
    this.definitions$ = this.definitionService.get()
      .pipe(
        map(objectToArray)
      );
  }

}
