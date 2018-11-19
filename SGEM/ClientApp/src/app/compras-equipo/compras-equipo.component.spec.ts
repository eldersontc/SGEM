import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasEquipoComponent } from './compras-equipo.component';

describe('ComprasEquipoComponent', () => {
  let component: ComprasEquipoComponent;
  let fixture: ComponentFixture<ComprasEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprasEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
