import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneEmailInputComponent } from './phone-email-input.component';

describe('PhoneEmailInputComponent', () => {
  let component: PhoneEmailInputComponent;
  let fixture: ComponentFixture<PhoneEmailInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneEmailInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhoneEmailInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
