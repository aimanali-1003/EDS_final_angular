import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJoblogComponent } from './edit-joblog.component';

describe('EditJoblogComponent', () => {
  let component: EditJoblogComponent;
  let fixture: ComponentFixture<EditJoblogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditJoblogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditJoblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
