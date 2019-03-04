import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';

import { RealmService } from '../../../shared/realm.service';
import { PersonaService } from '../personas.service';

@Component({
  selector: 'ddap-persona-manage',
  templateUrl: './persona-manage.component.html',
  styleUrls: ['./persona-manage.component.scss'],
})
export class PersonaManageComponent {

  persona: any = {};

  constructor(private personaService: PersonaService, private router: Router, private realmService: RealmService) { }

  onSubmit(value: any) {
    this.personaService.save(JSON.parse(value.body))
      .pipe(flatMap(_ => this.realmService.underRealm('/personas')))
      .subscribe(path => this.router.navigate([path]));
  }
}
