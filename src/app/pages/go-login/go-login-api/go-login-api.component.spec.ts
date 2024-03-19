import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoLoginApiComponent } from './go-login-api.component';

describe('GoLoginApiComponent', () => {
  let component: GoLoginApiComponent;
  let fixture: ComponentFixture<GoLoginApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoLoginApiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoLoginApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
