import { TestBed } from '@angular/core/testing';

import { ClientDialogService } from './client-dialog.service';

describe('ClientDialogService', () => {
  let service: ClientDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
