import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoLoginApiEditComponent } from './go-login-api-edit.component';

describe('GoLoginApiEditComponent', () => {
  let component: GoLoginApiEditComponent;
  let fixture: ComponentFixture<GoLoginApiEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoLoginApiEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoLoginApiEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
