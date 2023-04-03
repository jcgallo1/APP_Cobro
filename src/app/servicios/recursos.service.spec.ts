import { TestBed } from '@angular/core/testing';

import { CuentasService } from './recursos.service';

describe('RecursosService', () => {
  let service: CuentasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuentasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
