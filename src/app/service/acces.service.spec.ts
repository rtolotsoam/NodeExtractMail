import { TestBed, inject } from '@angular/core/testing';

import { AccesService } from './acces.service';

describe('AccesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccesService]
    });
  });

  it('should be created', inject([AccesService], (service: AccesService) => {
    expect(service).toBeTruthy();
  }));
});
