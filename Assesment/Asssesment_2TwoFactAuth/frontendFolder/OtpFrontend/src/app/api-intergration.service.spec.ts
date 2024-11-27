import { TestBed } from '@angular/core/testing';

import { ApiIntergrationService } from './api-intergration.service';

describe('ApiIntergrationService', () => {
  let service: ApiIntergrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiIntergrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
