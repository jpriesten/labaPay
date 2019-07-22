import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTabsPage } from './app-tabs.page';

describe('AppTabsPage', () => {
  let component: AppTabsPage;
  let fixture: ComponentFixture<AppTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTabsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
