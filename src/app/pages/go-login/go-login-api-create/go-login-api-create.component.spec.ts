import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoLoginApiCreateComponent } from './go-login-api-create.component';

describe('GoLoginApiCreateComponent', () => {
  let component: GoLoginApiCreateComponent;
  let fixture: ComponentFixture<GoLoginApiCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoLoginApiCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoLoginApiCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
