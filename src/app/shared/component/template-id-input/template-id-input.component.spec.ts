import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateIdInputComponent } from './template-id-input.component';

describe('TemplateIdInputComponent', () => {
  let component: TemplateIdInputComponent;
  let fixture: ComponentFixture<TemplateIdInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateIdInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplateIdInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
