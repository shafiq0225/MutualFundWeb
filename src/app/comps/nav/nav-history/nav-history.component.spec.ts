import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavHistoryComponent } from './nav-history.component';

describe('NavHistoryComponent', () => {
  let component: NavHistoryComponent;
  let fixture: ComponentFixture<NavHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
