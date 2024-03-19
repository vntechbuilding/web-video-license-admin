import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoLoginProfilesZipComponent } from './go-login-profiles-zip.component';

describe('GoLoginProfilesZipComponent', () => {
  let component: GoLoginProfilesZipComponent;
  let fixture: ComponentFixture<GoLoginProfilesZipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoLoginProfilesZipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoLoginProfilesZipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
