import { TestBed } from '@angular/core/testing';

import { ApiIntergrateService } from './api-intergrate.service';

describe('ApiIntergrateService', () => {
  let service: ApiIntergrateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiIntergrateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
