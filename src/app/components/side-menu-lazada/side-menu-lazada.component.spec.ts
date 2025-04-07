import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuLazadaComponent } from './side-menu-lazada.component';

describe('SideMenuLazadaComponent', () => {
  let component: SideMenuLazadaComponent;
  let fixture: ComponentFixture<SideMenuLazadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideMenuLazadaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideMenuLazadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
