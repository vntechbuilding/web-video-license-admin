import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWithdrawComponent } from './user-withdraw.component';

describe('UserWithdrawComponent', () => {
  let component: UserWithdrawComponent;
  let fixture: ComponentFixture<UserWithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserWithdrawComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
