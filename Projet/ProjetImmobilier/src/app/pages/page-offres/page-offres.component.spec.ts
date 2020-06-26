import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageOffresComponent } from './page-offres.component';

describe('PageOffresComponent', () => {
  let component: PageOffresComponent;
  let fixture: ComponentFixture<PageOffresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageOffresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageOffresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
