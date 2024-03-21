import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCategoryEditComponent } from './news-category-edit.component';

describe('NewsCategoryEditComponent', () => {
  let component: NewsCategoryEditComponent;
  let fixture: ComponentFixture<NewsCategoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsCategoryEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
