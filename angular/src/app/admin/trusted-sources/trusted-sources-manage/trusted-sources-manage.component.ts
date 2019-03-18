import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TrustedSourcesService } from '../trusted-sources.service';

@Component({
  selector: 'ddap-trusted-source-manage',
  templateUrl: './trusted-sources-manage.component.html',
  styleUrls: ['./trusted-sources-manage.component.scss'],
})
export class TrustedSourcesManageComponent {
  constructor(private trustedSourcesService: TrustedSourcesService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  save(id, change) {
    this.trustedSourcesService.save(id, change)
      .subscribe(() => this.router.navigate(['../..'], { relativeTo: this.route }));
  }
}
