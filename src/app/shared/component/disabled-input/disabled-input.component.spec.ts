import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabledInputComponent } from './disabled-input.component';

describe('DisabledInputComponent', () => {
  let component: DisabledInputComponent;
  let fixture: ComponentFixture<DisabledInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisabledInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisabledInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
