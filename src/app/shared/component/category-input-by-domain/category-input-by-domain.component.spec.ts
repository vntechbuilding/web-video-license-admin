import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryInputByDomainComponent } from './category-input-by-domain.component';

describe('CategoryInputByDomainComponent', () => {
  let component: CategoryInputByDomainComponent;
  let fixture: ComponentFixture<CategoryInputByDomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryInputByDomainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryInputByDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
