import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnecterPage } from './connecter.page';

describe('ConnecterPage', () => {
  let component: ConnecterPage;
  let fixture: ComponentFixture<ConnecterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnecterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
