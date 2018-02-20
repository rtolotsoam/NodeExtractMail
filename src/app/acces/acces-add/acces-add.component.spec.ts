import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesAddComponent } from './acces-add.component';

describe('AccesAddComponent', () => {
  let component: AccesAddComponent;
  let fixture: ComponentFixture<AccesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
