import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { ClaimDefinitionService } from '../claim-definitions.service';

@Component({
  selector: 'ddap-claim-definition-manage',
  templateUrl: './claim-definition-manage.component.html',
  styleUrls: ['./claim-definition-manage.component.scss'],
})
export class ClaimDefinitionManageComponent {

  constructor(private definitionService: ClaimDefinitionService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  add(id, change) {
    this.definitionService.save(id, change)
      .subscribe(() => this.router.navigate(['../..'], { relativeTo: this.route }));
  }
}
