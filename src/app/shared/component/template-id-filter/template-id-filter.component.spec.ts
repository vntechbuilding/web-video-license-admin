import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateIdFilterComponent } from './template-id-filter.component';

describe('TemplateIdFilterComponent', () => {
  let component: TemplateIdFilterComponent;
  let fixture: ComponentFixture<TemplateIdFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateIdFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplateIdFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
