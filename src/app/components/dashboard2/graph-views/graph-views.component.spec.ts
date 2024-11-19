import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphViewsComponent } from './graph-views.component';

describe('GraphViewsComponent', () => {
  let component: GraphViewsComponent;
  let fixture: ComponentFixture<GraphViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphViewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
