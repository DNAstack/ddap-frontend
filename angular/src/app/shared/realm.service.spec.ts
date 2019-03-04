import { TestBed } from '@angular/core/testing';

import { RealmService } from './realm.service';

describe('RealmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RealmService = TestBed.get(RealmService);
    expect(service).toBeTruthy();
  });
});
