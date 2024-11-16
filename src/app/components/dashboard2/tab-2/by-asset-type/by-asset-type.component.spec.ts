import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByAssetTypeComponent } from './by-asset-type.component';

describe('ByAssetTypeComponent', () => {
  let component: ByAssetTypeComponent;
  let fixture: ComponentFixture<ByAssetTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByAssetTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByAssetTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
