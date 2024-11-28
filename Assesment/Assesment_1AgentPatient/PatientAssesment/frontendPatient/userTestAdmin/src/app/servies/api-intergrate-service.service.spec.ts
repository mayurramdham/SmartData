import { TestBed } from '@angular/core/testing';

import { ApiIntergrateServiceService } from './api-intergrate-service.service';

describe('ApiIntergrateServiceService', () => {
  let service: ApiIntergrateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiIntergrateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
