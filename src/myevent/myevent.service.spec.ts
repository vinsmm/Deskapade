import { TestBed } from '@angular/core/testing';

import { MyeventService } from './myevent.service';

describe('MyeventService', () => {
  let service: MyeventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyeventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
