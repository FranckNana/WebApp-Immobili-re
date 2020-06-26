import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationOffreComponent } from './modification-offre.component';

describe('ModificationOffreComponent', () => {
  let component: ModificationOffreComponent;
  let fixture: ComponentFixture<ModificationOffreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificationOffreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
