import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarInformacionContactoComponent } from './modificar-informacion-contacto.component';

describe('ModificarInformacionContactoComponent', () => {
  let component: ModificarInformacionContactoComponent;
  let fixture: ComponentFixture<ModificarInformacionContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarInformacionContactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarInformacionContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
