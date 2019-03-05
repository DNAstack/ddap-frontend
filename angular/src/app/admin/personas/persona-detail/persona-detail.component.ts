import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flatMap, pluck } from 'rxjs/operators';

import { RealmService } from '../../../shared/realm.service';
import { PersonaService } from '../personas.service';

@Component({
  selector: 'ddap-persona-detail',
  templateUrl: './persona-detail.component.html',
  styleUrls: ['./persona-detail.component.scss'],
})
export class PersonaDetailComponent implements OnInit {

  persona: any;

  constructor(
    private route: ActivatedRoute,
    public personaService: PersonaService,
    public realmService: RealmService
  ) {}

  ngOnInit() {
    this.route.params.pipe(
      flatMap(params => this.getPersona(params['personaName']))
    ).subscribe(persona => this.persona = persona);
  }

  private getPersona(personaName) {
    return this.personaService.get()
      .pipe(
        pluck(personaName)
      );
  }
}
