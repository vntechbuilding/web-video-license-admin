import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCategoryIndexComponent } from './news-category-index.component';

describe('NewsCategoryIndexComponent', () => {
  let component: NewsCategoryIndexComponent;
  let fixture: ComponentFixture<NewsCategoryIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsCategoryIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsCategoryIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
