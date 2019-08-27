import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ddap-entity-description-link',
  templateUrl: './entity-description-link.component.html',
  styleUrls: ['./entity-description-link.component.scss'],
})
export class EntityDescriptionLinkComponent {

  @Input()
  path: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  navigateToPath() {
    this.router.navigate([this.path], { relativeTo: this.activatedRoute.parent });
  }

}
