import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCategoryCreateComponent } from './news-category-create.component';

describe('NewsCategoryCreateComponent', () => {
  let component: NewsCategoryCreateComponent;
  let fixture: ComponentFixture<NewsCategoryCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsCategoryCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
