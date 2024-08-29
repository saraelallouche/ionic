import { TestBed } from '@angular/core/testing';

import { BluetoothStatusService } from './bluetooth-status.service';

describe('BluetoothStatusService', () => {
  let service: BluetoothStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BluetoothStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
