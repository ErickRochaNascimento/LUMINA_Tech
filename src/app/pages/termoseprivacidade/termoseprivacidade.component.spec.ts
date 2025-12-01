import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermoseprivacidadeComponent } from './termoseprivacidade.component';

describe('TermoseprivacidadeComponent', () => {
  let component: TermoseprivacidadeComponent;
  let fixture: ComponentFixture<TermoseprivacidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermoseprivacidadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermoseprivacidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
