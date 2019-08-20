import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessDebitPage } from './process-debit.page';

describe('ProcessDebitPage', () => {
  let component: ProcessDebitPage;
  let fixture: ComponentFixture<ProcessDebitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessDebitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessDebitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
