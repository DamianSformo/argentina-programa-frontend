import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdiomaExtComponent } from './idioma-ext.component';

describe('IdiomaExtComponent', () => {
  let component: IdiomaExtComponent;
  let fixture: ComponentFixture<IdiomaExtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdiomaExtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdiomaExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
