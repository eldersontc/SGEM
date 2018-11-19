import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionesEquipoFormComponent } from './asignaciones-equipo-form.component';

describe('AsignacionesEquipoFormComponent', () => {
  let component: AsignacionesEquipoFormComponent;
  let fixture: ComponentFixture<AsignacionesEquipoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignacionesEquipoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionesEquipoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
