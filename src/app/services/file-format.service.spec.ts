import { TestBed } from '@angular/core/testing';

import { FileFormatService } from './file-format.service';

describe('FileFormatService', () => {
  let service: FileFormatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileFormatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
