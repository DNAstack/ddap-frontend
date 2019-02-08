import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DefinitionService } from '../definitions.service';

@Component({
  selector: 'ddap-definition-manage',
  templateUrl: './definition-manage.component.html',
  styleUrls: ['./definition-manage.component.scss'],
})
export class DefinitionManageComponent implements OnInit {

  definition: any = {};

  constructor(private definitionService: DefinitionService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(value: any) {
    this.definitionService.save(JSON.parse(value.body))
      .subscribe(() => this.router.navigate(['/definitions']));
  }
}
