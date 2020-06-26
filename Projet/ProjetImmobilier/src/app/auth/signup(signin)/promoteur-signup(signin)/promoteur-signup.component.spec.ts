import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoteurSignupComponent } from './promoteur-signup.component';

describe('PromoteurSignupComponent', () => {
  let component: PromoteurSignupComponent;
  let fixture: ComponentFixture<PromoteurSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoteurSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoteurSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
