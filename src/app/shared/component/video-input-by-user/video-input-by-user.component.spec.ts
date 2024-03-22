import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoInputByUserComponent } from './video-input-by-user.component';

describe('VideoInputByUserComponent', () => {
  let component: VideoInputByUserComponent;
  let fixture: ComponentFixture<VideoInputByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoInputByUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoInputByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
