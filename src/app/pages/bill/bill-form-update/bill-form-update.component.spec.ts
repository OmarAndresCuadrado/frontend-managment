import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillFormUpdateComponent } from './bill-form-update.component';

describe('BillFormUpdateComponent', () => {
  let component: BillFormUpdateComponent;
  let fixture: ComponentFixture<BillFormUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillFormUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
