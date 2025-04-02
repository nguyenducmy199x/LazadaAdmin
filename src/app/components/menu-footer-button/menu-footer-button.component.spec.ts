import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuFooterButtonComponent} from './menu-footer-button.component';

describe('MenuFooterButtonComponent', () => {
  let component: MenuFooterButtonComponent;
  let fixture: ComponentFixture<MenuFooterButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuFooterButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuFooterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
