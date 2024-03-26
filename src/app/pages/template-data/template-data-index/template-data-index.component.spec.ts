import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDataIndexComponent } from './template-data-index.component';

describe('TemplateDataIndexComponent', () => {
  let component: TemplateDataIndexComponent;
  let fixture: ComponentFixture<TemplateDataIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateDataIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplateDataIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
