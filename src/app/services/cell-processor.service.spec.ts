import { TestBed } from '@angular/core/testing';

import { CellProcessorService } from './cell-processor.service';

describe('CellProcessorService', () => {
  let service: CellProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CellProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
