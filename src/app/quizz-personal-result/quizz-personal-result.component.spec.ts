import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzPersonalResultComponent } from './quizz-personal-result.component';

describe('QuizzPersonalResultComponent', () => {
  let component: QuizzPersonalResultComponent;
  let fixture: ComponentFixture<QuizzPersonalResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzPersonalResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzPersonalResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
