import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionesEquipoComponent } from './asignaciones-equipo.component';

describe('AsignacionesEquipoComponent', () => {
  let component: AsignacionesEquipoComponent;
  let fixture: ComponentFixture<AsignacionesEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignacionesEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionesEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
