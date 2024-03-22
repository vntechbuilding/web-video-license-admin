import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDomainFilterComponent } from './user-domain-filter.component';

describe('UserDomainFilterComponent', () => {
  let component: UserDomainFilterComponent;
  let fixture: ComponentFixture<UserDomainFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDomainFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDomainFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
