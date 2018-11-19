import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposFormComponent } from './equipos-form.component';

describe('EquiposFormComponent', () => {
  let component: EquiposFormComponent;
  let fixture: ComponentFixture<EquiposFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquiposFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquiposFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
