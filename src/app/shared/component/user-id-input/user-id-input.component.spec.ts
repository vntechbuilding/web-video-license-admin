import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIdInputComponent } from './user-id-input.component';

describe('UserIdInputComponent', () => {
  let component: UserIdInputComponent;
  let fixture: ComponentFixture<UserIdInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserIdInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserIdInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
