import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupSinglePageComponent } from './signup-single-page.component';

describe('SignupSinglePageComponent', () => {
  let component: SignupSinglePageComponent;
  let fixture: ComponentFixture<SignupSinglePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupSinglePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupSinglePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
