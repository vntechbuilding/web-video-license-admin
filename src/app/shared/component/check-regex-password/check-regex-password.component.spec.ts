import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckRegexPasswordComponent } from './check-regex-password.component';

describe('CheckRegexPasswordComponent', () => {
  let component: CheckRegexPasswordComponent;
  let fixture: ComponentFixture<CheckRegexPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckRegexPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckRegexPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
