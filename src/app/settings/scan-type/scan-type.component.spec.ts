import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanTypeComponent } from './scan-type.component';

describe('ScanTypeComponent', () => {
  let component: ScanTypeComponent;
  let fixture: ComponentFixture<ScanTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScanTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
