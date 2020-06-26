import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailpromoteurComponent } from './mailpromoteur.component';

describe('MailpromoteurComponent', () => {
  let component: MailpromoteurComponent;
  let fixture: ComponentFixture<MailpromoteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailpromoteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailpromoteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
