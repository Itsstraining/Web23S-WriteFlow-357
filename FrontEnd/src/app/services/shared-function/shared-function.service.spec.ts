import { TestBed } from '@angular/core/testing';

import { SharedFunctionService } from './shared-function.service';

describe('SharedFunctionService', () => {
  let service: SharedFunctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedFunctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
