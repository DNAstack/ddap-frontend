import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OptionService } from '../options.service';

@Component({
  selector: 'ddap-option-manage',
  templateUrl: './option-manage.component.html',
  styleUrls: ['./option-manage.component.scss'],
})
export class OptionManageComponent {

  constructor(private optionService: OptionService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  save(id, change) {
    this.optionService.save(id, change)
      .subscribe(() => this.router.navigate(['../..'], { relativeTo: this.route }));
  }
}
