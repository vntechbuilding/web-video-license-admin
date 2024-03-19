import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullnameInputComponent } from './fullname-input.component';

describe('FullnameInputComponent', () => {
  let component: FullnameInputComponent;
  let fixture: ComponentFixture<FullnameInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullnameInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullnameInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
