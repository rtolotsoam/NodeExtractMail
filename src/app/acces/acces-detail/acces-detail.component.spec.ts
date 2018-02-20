import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesDetailComponent } from './acces-detail.component';

describe('AccesDetailComponent', () => {
  let component: AccesDetailComponent;
  let fixture: ComponentFixture<AccesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
