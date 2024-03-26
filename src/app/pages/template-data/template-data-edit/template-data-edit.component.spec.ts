import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDataEditComponent } from './template-data-edit.component';

describe('TemplateDataEditComponent', () => {
  let component: TemplateDataEditComponent;
  let fixture: ComponentFixture<TemplateDataEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateDataEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplateDataEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
