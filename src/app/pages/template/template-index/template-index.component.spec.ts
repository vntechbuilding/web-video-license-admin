import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateIndexComponent } from './template-index.component';

describe('TemplateIndexComponent', () => {
  let component: TemplateIndexComponent;
  let fixture: ComponentFixture<TemplateIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplateIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
