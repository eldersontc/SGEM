import { TestBed } from '@angular/core/testing';

import { ComprasEquipoService } from './compras-equipo.service';

describe('ComprasEquipoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComprasEquipoService = TestBed.get(ComprasEquipoService);
    expect(service).toBeTruthy();
  });
});
