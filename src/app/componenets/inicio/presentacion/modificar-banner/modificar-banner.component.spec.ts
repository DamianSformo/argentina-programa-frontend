import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarBannerComponent } from './modificar-banner.component';

describe('ModificarBannerComponent', () => {
  let component: ModificarBannerComponent;
  let fixture: ComponentFixture<ModificarBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
