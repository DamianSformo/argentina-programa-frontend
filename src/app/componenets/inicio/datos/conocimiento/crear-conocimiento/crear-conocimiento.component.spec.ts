import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearConocimientoComponent } from './crear-conocimiento.component';

describe('CrearConocimientoComponent', () => {
  let component: CrearConocimientoComponent;
  let fixture: ComponentFixture<CrearConocimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearConocimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearConocimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
