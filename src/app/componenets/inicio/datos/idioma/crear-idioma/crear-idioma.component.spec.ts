import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearIdiomaComponent } from './crear-idioma.component';

describe('CrearIdiomaComponent', () => {
  let component: CrearIdiomaComponent;
  let fixture: ComponentFixture<CrearIdiomaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearIdiomaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearIdiomaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
