import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateUpdateZipComponent } from './template-update-zip.component';

describe('TemplateUpdateZipComponent', () => {
  let component: TemplateUpdateZipComponent;
  let fixture: ComponentFixture<TemplateUpdateZipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateUpdateZipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplateUpdateZipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
