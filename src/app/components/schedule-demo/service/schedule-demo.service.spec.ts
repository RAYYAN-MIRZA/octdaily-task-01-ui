import { TestBed } from '@angular/core/testing';

import { ScheduleDemoService } from './schedule-demo.service';

describe('ScheduleDemoService', () => {
  let service: ScheduleDemoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleDemoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
