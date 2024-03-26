import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainTemplateIndexComponent } from './domain-template-index.component';

describe('DomainTemplateIndexComponent', () => {
  let component: DomainTemplateIndexComponent;
  let fixture: ComponentFixture<DomainTemplateIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainTemplateIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DomainTemplateIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
