import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherInputByUserComponent } from './publisher-input-by-user.component';

describe('PublisherInputByUserComponent', () => {
  let component: PublisherInputByUserComponent;
  let fixture: ComponentFixture<PublisherInputByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublisherInputByUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublisherInputByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
