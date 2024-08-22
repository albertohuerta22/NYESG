import { TestBed } from '@angular/core/testing';

import { EnergyUsageService } from '../../services/energy-usage.service';

describe('WasteDisposalService', () => {
  let service: EnergyUsageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnergyUsageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
