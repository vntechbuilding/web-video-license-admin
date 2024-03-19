import { TestBed } from '@angular/core/testing';

import { GoLoginApiService } from './go-login-api.service';

describe('GoLoginApiService', () => {
  let service: GoLoginApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoLoginApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
