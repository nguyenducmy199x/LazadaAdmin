import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazadaComponent } from './lazada.component';

describe('LazadaComponent', () => {
  let component: LazadaComponent;
  let fixture: ComponentFixture<LazadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LazadaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LazadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
