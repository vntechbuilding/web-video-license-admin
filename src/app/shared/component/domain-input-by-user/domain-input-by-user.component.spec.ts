import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainInputByUserComponent } from './domain-input-by-user.component';

describe('DomainInputByUserComponent', () => {
  let component: DomainInputByUserComponent;
  let fixture: ComponentFixture<DomainInputByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainInputByUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DomainInputByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
