import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomaticPatchComponent } from './automatic-patch.component';

describe('AutomaticPatchComponent', () => {
  let component: AutomaticPatchComponent;
  let fixture: ComponentFixture<AutomaticPatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutomaticPatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomaticPatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
