import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIssuesPageComponent } from './admin-issues-page.component';

describe('AdminIssuesPageComponent', () => {
  let component: AdminIssuesPageComponent;
  let fixture: ComponentFixture<AdminIssuesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminIssuesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminIssuesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
