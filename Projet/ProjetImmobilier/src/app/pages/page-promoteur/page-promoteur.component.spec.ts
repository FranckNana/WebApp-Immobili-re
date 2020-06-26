import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePromoteurComponent } from './page-promoteur.component';

describe('PagePromoteurComponent', () => {
  let component: PagePromoteurComponent;
  let fixture: ComponentFixture<PagePromoteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePromoteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePromoteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
