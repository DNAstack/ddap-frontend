import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private personaService: PersonaService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.personas$ = this.personaService.get(this.routeDamId())
      .pipe(map(EntityModel.arrayFromMap));
  }

  private routeDamId() {
    return this.route
      .snapshot
      .paramMap
      .get('damId');
  }

}
