import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnIndicator } from './turn-indicator';

describe('TurnIndicator', () => {
  let component: TurnIndicator;
  let fixture: ComponentFixture<TurnIndicator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnIndicator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnIndicator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
