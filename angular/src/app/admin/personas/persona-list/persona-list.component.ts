import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { objectToArray } from '../../../shared/util';
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
      .pipe(
        map(objectToArray)
      );
  }

}
