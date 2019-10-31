import { Component } from '@angular/core';

import { SandboxBannerStateService } from './sandbox-banner-state.service';

@Component({
  selector: 'ddaplib-sandbox-banner',
  templateUrl: './sandbox-banner.component.html',
  styleUrls: ['./sandbox-banner.component.scss'],
})
export class SandboxBannerComponent {

  constructor(public sandboxBannerStateService: SandboxBannerStateService) {
  }

  accept() {
    if (!this.sandboxBannerStateService.isAcknowledged()) {
      this.sandboxBannerStateService.storeAcknowledgement();
    }
  }

}
