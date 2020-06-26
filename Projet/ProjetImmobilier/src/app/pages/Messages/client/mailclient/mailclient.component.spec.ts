import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailclientComponent } from './mailclient.component';

describe('MailclientComponent', () => {
  let component: MailclientComponent;
  let fixture: ComponentFixture<MailclientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailclientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
