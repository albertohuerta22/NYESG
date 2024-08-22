import { TestBed } from '@angular/core/testing';

import { WasteDisposalService } from './waste-disposal.service';

describe('WasteDisposalService', () => {
  let service: WasteDisposalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WasteDisposalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
