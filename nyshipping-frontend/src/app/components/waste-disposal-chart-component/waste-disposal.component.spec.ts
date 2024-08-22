import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteDisposalComponent } from './waste-disposal.component';

describe('WasteDisposalComponent', () => {
  let component: WasteDisposalComponent;
  let fixture: ComponentFixture<WasteDisposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WasteDisposalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WasteDisposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
