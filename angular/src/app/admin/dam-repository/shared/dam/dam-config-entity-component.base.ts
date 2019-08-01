import { ActivatedRoute } from '@angular/router';

export class DamConfigEntityComponentBase {

  constructor(protected route: ActivatedRoute) {
  }

  get damId() {
    return this.route.snapshot.params.damId;
  }

}
