import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullnamePhoneEmailInputComponent } from './fullname-phone-email-input.component';

describe('FullnamePhoneEmailInputComponent', () => {
  let component: FullnamePhoneEmailInputComponent;
  let fixture: ComponentFixture<FullnamePhoneEmailInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullnamePhoneEmailInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullnamePhoneEmailInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
