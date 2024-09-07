import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContacterPagesPage } from './contacter-pages.page';

describe('ContacterPagesPage', () => {
  let component: ContacterPagesPage;
  let fixture: ComponentFixture<ContacterPagesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContacterPagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
