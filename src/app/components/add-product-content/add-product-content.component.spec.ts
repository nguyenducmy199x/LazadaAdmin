import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductContentComponent } from './add-product-content.component';

describe('AddProductContentComponent', () => {
  let component: AddProductContentComponent;
  let fixture: ComponentFixture<AddProductContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
