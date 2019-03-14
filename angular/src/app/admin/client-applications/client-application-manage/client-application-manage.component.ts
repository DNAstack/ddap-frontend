import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ClientApplicationService } from '../client-applications.service';

@Component({
  selector: 'ddap-client-application-manage',
  templateUrl: './client-application-manage.component.html',
  styleUrls: ['./client-application-manage.component.scss'],
})
export class ClientApplicationManageComponent {

  constructor(
    public service: ClientApplicationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  add(id, change) {
    this.service.save(id, change)
      .subscribe(() => this.router.navigate(['../..'], { relativeTo: this.route }));
  }
}
