import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasEquipoFormComponent } from './compras-equipo-form.component';

describe('ComprasEquipoFormComponent', () => {
  let component: ComprasEquipoFormComponent;
  let fixture: ComponentFixture<ComprasEquipoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprasEquipoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasEquipoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
