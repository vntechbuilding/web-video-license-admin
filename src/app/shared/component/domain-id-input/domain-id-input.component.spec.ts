import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainIdInputComponent } from './domain-id-input.component';

describe('DomainIdInputComponent', () => {
  let component: DomainIdInputComponent;
  let fixture: ComponentFixture<DomainIdInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainIdInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DomainIdInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
