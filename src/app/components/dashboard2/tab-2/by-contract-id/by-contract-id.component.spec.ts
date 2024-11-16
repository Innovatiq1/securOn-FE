import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByContractIdComponent } from './by-contract-id.component';

describe('ByContractIdComponent', () => {
  let component: ByContractIdComponent;
  let fixture: ComponentFixture<ByContractIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByContractIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByContractIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
