import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCategoryOptionComponent } from './news-category-option.component';

describe('NewsCategoryOptionComponent', () => {
  let component: NewsCategoryOptionComponent;
  let fixture: ComponentFixture<NewsCategoryOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsCategoryOptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsCategoryOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
