import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientInfoPopupComponent } from './client-info-popup.component';

describe('ClientInfoPopupComponent', () => {
  let component: ClientInfoPopupComponent;
  let fixture: ComponentFixture<ClientInfoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientInfoPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientInfoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
