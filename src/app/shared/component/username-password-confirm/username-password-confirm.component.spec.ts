import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernamePasswordConfirmComponent } from './username-password-confirm.component';

describe('UsernamePasswordConfirmComponent', () => {
  let component: UsernamePasswordConfirmComponent;
  let fixture: ComponentFixture<UsernamePasswordConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsernamePasswordConfirmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsernamePasswordConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
