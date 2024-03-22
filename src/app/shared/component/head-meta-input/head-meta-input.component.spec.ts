import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadMetaInputComponent } from './head-meta-input.component';

describe('HeadMetaInputComponent', () => {
  let component: HeadMetaInputComponent;
  let fixture: ComponentFixture<HeadMetaInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadMetaInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeadMetaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
