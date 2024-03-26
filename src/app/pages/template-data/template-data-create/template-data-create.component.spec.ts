import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDataCreateComponent } from './template-data-create.component';

describe('TemplateDataCreateComponent', () => {
  let component: TemplateDataCreateComponent;
  let fixture: ComponentFixture<TemplateDataCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateDataCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplateDataCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
