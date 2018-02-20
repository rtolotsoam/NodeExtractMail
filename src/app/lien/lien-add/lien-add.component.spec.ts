import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LienAddComponent } from './lien-add.component';

describe('LienAddComponent', () => {
  let component: LienAddComponent;
  let fixture: ComponentFixture<LienAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LienAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LienAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
