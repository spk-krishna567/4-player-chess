import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveControls } from './move-controls';

describe('MoveControls', () => {
  let component: MoveControls;
  let fixture: ComponentFixture<MoveControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoveControls]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoveControls);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
