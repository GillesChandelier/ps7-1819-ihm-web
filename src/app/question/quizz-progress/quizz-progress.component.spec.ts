import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzProgressComponent } from './quizz-progress.component';

describe('QuizzProgressComponent', () => {
  let component: QuizzProgressComponent;
  let fixture: ComponentFixture<QuizzProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
