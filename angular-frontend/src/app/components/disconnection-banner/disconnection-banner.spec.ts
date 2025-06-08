import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisconnectionBanner } from './disconnection-banner';

describe('DisconnectionBanner', () => {
  let component: DisconnectionBanner;
  let fixture: ComponentFixture<DisconnectionBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisconnectionBanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisconnectionBanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
