import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoZoomComponent } from './photo-zoom.component';

describe('PhotoZoomComponent', () => {
  let component: PhotoZoomComponent;
  let fixture: ComponentFixture<PhotoZoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoZoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
