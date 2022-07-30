import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducacionExtComponent } from './educacion-ext.component';

describe('EducacionExtComponent', () => {
  let component: EducacionExtComponent;
  let fixture: ComponentFixture<EducacionExtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducacionExtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducacionExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
