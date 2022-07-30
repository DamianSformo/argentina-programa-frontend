import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConocimientoExtComponent } from './conocimiento-ext.component';

describe('ConocimientoExtComponent', () => {
  let component: ConocimientoExtComponent;
  let fixture: ComponentFixture<ConocimientoExtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConocimientoExtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConocimientoExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
