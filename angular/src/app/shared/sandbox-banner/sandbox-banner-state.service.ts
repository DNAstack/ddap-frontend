import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

const STORAGE_KEY = 'sandbox-warning-acknowledgement';

@Injectable({
  providedIn: 'root',
})
export class SandboxBannerStateService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
  }

  storeAcknowledgement(): void {
    this.storage.set(STORAGE_KEY, true);
  }

  isAcknowledged(): boolean {
    return this.storage.get(STORAGE_KEY) || false;
  }

}
