import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelsDialogComponent } from './levels-dialog.component';

describe('LevelsDialogComponent', () => {
  let component: LevelsDialogComponent;
  let fixture: ComponentFixture<LevelsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
