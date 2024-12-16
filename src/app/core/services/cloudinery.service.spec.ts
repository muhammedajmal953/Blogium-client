import { TestBed } from '@angular/core/testing';

import { CloudineryService } from './cloudinery.service';

describe('CloudineryService', () => {
  let service: CloudineryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudineryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
