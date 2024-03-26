import { TestBed } from '@angular/core/testing';

import { DomainTemplateService } from './domain-template.service';

describe('DomainTemplateService', () => {
  let service: DomainTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomainTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
