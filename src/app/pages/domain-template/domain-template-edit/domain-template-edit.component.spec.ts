import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainTemplateEditComponent } from './domain-template-edit.component';

describe('DomainTemplateEditComponent', () => {
  let component: DomainTemplateEditComponent;
  let fixture: ComponentFixture<DomainTemplateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainTemplateEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DomainTemplateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
