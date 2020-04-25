import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeographicChartComponent } from './geographic-chart.component';

describe('GeographicChartComponent', () => {
  let component: GeographicChartComponent;
  let fixture: ComponentFixture<GeographicChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeographicChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeographicChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
