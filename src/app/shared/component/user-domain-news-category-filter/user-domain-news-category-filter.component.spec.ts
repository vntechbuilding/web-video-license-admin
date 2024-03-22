import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDomainNewsCategoryFilterComponent } from './user-domain-news-category-filter.component';

describe('UserDomainNewsCategoryFilterComponent', () => {
  let component: UserDomainNewsCategoryFilterComponent;
  let fixture: ComponentFixture<UserDomainNewsCategoryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDomainNewsCategoryFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDomainNewsCategoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
