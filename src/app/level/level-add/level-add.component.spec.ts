import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelAddComponent } from './level-add.component';

describe('LevelAddComponent', () => {
  let component: LevelAddComponent;
  let fixture: ComponentFixture<LevelAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
