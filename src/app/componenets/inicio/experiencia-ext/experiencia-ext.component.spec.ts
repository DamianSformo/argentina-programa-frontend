import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciaExtComponent } from './experiencia-ext.component';

describe('ExperienciaExtComponent', () => {
  let component: ExperienciaExtComponent;
  let fixture: ComponentFixture<ExperienciaExtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienciaExtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienciaExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
