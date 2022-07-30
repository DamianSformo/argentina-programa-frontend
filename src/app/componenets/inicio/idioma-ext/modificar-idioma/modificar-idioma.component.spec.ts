import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarIdiomaComponent } from './modificar-idioma.component';

describe('ModificarIdiomaComponent', () => {
  let component: ModificarIdiomaComponent;
  let fixture: ComponentFixture<ModificarIdiomaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarIdiomaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarIdiomaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
