import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCkeditorComponent } from './input-ckeditor.component';

describe('InputCkeditorComponent', () => {
  let component: InputCkeditorComponent;
  let fixture: ComponentFixture<InputCkeditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputCkeditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputCkeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
