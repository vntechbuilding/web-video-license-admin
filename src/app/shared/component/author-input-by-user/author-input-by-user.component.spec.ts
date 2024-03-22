import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorInputByUserComponent } from './author-input-by-user.component';

describe('AuthorInputByUserComponent', () => {
  let component: AuthorInputByUserComponent;
  let fixture: ComponentFixture<AuthorInputByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorInputByUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthorInputByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
