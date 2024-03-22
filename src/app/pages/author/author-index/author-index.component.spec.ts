import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorIndexComponent } from './author-index.component';

describe('AuthorIndexComponent', () => {
  let component: AuthorIndexComponent;
  let fixture: ComponentFixture<AuthorIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthorIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
