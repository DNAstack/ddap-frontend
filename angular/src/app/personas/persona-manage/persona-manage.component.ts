import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PersonaService } from '../personas.service';

@Component({
  selector: 'ddap-persona-manage',
  templateUrl: './persona-manage.component.html',
  styleUrls: ['./persona-manage.component.scss'],
})
export class PersonaManageComponent implements OnInit {

  persona: any = {};

  constructor(private personaService: PersonaService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(value: any) {
    this.personaService.save(JSON.parse(value.body))
      .subscribe(() => this.router.navigate(['/personas']));
  }
}
