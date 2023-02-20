import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantOwnerPanelComponent } from './restaurant-owner-panel.component';

describe('RestaurantOwnerPanelComponent', () => {
  let component: RestaurantOwnerPanelComponent;
  let fixture: ComponentFixture<RestaurantOwnerPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantOwnerPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantOwnerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
