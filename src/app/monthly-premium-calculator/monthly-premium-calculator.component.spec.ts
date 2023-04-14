import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyPremiumCalculatorComponent } from './monthly-premium-calculator.component';

describe('MonthlyPremiumCalculatorComponent', () => {
  let component: MonthlyPremiumCalculatorComponent;
  let fixture: ComponentFixture<MonthlyPremiumCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyPremiumCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyPremiumCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
