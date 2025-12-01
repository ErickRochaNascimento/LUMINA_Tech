import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesdashboardComponent } from './salesdashboard.component';

describe('SalesdashboardComponent', () => {
  let component: SalesdashboardComponent;
  let fixture: ComponentFixture<SalesdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesdashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
