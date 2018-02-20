import { TestBed, inject } from '@angular/core/testing';

import { LienService } from './lien.service';

describe('LienService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LienService]
    });
  });

  it('should be created', inject([LienService], (service: LienService) => {
    expect(service).toBeTruthy();
  }));
});
