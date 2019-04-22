import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { EntityModel } from '../../shared/entity.model';
import { PersonaService } from '../personas.service';

@Component({
  selector: 'ddap-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.scss'],
})
export class PersonaListComponent implements OnInit {

  personas$: Observable<any[]>;

  constructor(private personaService: PersonaService) {
  }

  ngOnInit() {
    this.personas$ = this.personaService.get()
      .pipe(map(EntityModel.arrayFromMap));
  }

  getFormattedExpiresTextFromClaim({ expires }) {
    if (!expires) {
      return;
    }

    const timestamp = moment.unix(expires);
    const relativeTime = timestamp.fromNow();
    return timestamp.isBefore(moment())
      ? `Expired ${relativeTime}`
      : `Expires ${relativeTime}`;
  }

}
