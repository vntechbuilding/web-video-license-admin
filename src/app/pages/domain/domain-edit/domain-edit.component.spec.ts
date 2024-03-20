import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainEditComponent } from './domain-edit.component';

describe('DomainEditComponent', () => {
  let component: DomainEditComponent;
  let fixture: ComponentFixture<DomainEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DomainEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
