import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckRegexComponent } from './check-regex.component';

describe('CheckRegexComponent', () => {
  let component: CheckRegexComponent;
  let fixture: ComponentFixture<CheckRegexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckRegexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckRegexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
