import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentImageInputComponent } from './content-image-input.component';

describe('ContentImageInputComponent', () => {
  let component: ContentImageInputComponent;
  let fixture: ComponentFixture<ContentImageInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentImageInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentImageInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
