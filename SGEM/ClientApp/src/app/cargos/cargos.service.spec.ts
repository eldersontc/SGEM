import { TestBed } from '@angular/core/testing';

import { CargosService } from './cargos.service';

describe('CargosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CargosService = TestBed.get(CargosService);
    expect(service).toBeTruthy();
  });
});
