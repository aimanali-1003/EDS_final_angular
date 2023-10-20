import { TestBed } from '@angular/core/testing';

import { DataRecipientService } from './data-recipient.service';

describe('DataRecipientService', () => {
  let service: DataRecipientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataRecipientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
