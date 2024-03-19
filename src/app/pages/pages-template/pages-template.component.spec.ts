import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesTemplateComponent } from './pages-template.component';

describe('PagesTemplateComponent', () => {
  let component: PagesTemplateComponent;
  let fixture: ComponentFixture<PagesTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagesTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
