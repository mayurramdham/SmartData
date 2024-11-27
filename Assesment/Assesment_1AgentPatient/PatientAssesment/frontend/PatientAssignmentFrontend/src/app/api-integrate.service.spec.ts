import { TestBed } from '@angular/core/testing';

import { ApiIntegrateService } from './api-integrate.service';

describe('ApiIntegrateService', () => {
  let service: ApiIntegrateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiIntegrateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
