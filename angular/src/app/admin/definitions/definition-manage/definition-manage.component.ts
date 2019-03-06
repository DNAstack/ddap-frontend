import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DefinitionService } from '../definitions.service';

@Component({
  selector: 'ddap-definition-manage',
  templateUrl: './definition-manage.component.html',
  styleUrls: ['./definition-manage.component.scss'],
})
export class DefinitionManageComponent {

  constructor(private definitionService: DefinitionService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  onSubmit(value: any) {
    this.definitionService.save(JSON.parse(value.body))
      .subscribe(() => this.router.navigate(['../..'], { relativeTo: this.route }));
  }
}
