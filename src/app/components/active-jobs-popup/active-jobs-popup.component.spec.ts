import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveJobsPopupComponent } from './active-jobs-popup.component';

describe('ActiveJobsPopupComponent', () => {
  let component: ActiveJobsPopupComponent;
  let fixture: ComponentFixture<ActiveJobsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveJobsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveJobsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
