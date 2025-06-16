import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanTypeCreateDialogComponent } from './scan-type-create-dialog.component';

describe('ScanTypeCreateDialogComponent', () => {
  let component: ScanTypeCreateDialogComponent;
  let fixture: ComponentFixture<ScanTypeCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScanTypeCreateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanTypeCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
