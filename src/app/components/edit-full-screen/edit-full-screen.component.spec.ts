import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFullScreenComponent } from './edit-full-screen.component';

describe('EditFullScreenComponent', () => {
  let component: EditFullScreenComponent;
  let fixture: ComponentFixture<EditFullScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFullScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFullScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
