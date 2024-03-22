import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherIndexComponent } from './publisher-index.component';

describe('PublisherIndexComponent', () => {
  let component: PublisherIndexComponent;
  let fixture: ComponentFixture<PublisherIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublisherIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublisherIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
