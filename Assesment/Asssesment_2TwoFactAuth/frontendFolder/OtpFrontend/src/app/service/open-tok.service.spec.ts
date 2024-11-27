import { TestBed } from '@angular/core/testing';

import { OpenTokService } from './open-tok.service';

describe('OpenTokService', () => {
  let service: OpenTokService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenTokService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
