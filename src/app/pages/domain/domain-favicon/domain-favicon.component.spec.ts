import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainFaviconComponent } from './domain-favicon.component';

describe('DomainFaviconComponent', () => {
  let component: DomainFaviconComponent;
  let fixture: ComponentFixture<DomainFaviconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainFaviconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DomainFaviconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
