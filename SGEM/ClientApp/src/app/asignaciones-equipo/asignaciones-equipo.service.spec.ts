import { TestBed } from '@angular/core/testing';

import { AsignacionesEquipoService } from './asignaciones-equipo.service';

describe('AsignacionesEquipoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsignacionesEquipoService = TestBed.get(AsignacionesEquipoService);
    expect(service).toBeTruthy();
  });
});
