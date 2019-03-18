import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PersonaService } from '../personas.service';

@Component({
  selector: 'ddap-persona-manage',
  templateUrl: './persona-manage.component.html',
  styleUrls: ['./persona-manage.component.scss'],
})
export class PersonaManageComponent {

  constructor(private personaService: PersonaService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  save(id, change) {
    this.personaService.save(id, change)
      .subscribe(() => this.router.navigate(['../..'], { relativeTo: this.route }));
  }
}
