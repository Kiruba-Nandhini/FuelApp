import { TestBed } from '@angular/core/testing';

import { TranslateFilesService } from './translate-files.service';

describe('TranslateFilesService', () => {
  let service: TranslateFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
