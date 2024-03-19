import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoLoginProfilesComponent } from './go-login-profiles.component';

describe('GoLoginProfilesComponent', () => {
  let component: GoLoginProfilesComponent;
  let fixture: ComponentFixture<GoLoginProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoLoginProfilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoLoginProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
