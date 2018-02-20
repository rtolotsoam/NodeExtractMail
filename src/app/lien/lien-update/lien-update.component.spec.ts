import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LienUpdateComponent } from './lien-update.component';

describe('LienUpdateComponent', () => {
  let component: LienUpdateComponent;
  let fixture: ComponentFixture<LienUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LienUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LienUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
