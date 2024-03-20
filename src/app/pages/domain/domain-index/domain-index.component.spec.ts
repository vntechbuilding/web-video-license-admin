import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainIndexComponent } from './domain-index.component';

describe('DomainIndexComponent', () => {
  let component: DomainIndexComponent;
  let fixture: ComponentFixture<DomainIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DomainIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
