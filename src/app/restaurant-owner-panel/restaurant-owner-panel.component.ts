import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../app-models/order.model';
import { Restaurant } from '../app-models/restaurant.model';
import { OrdersService } from '../app-services/orders.service';
import { RestaurantOwnersService } from '../app-services/restaurantOwners.service';
import { RestaurantsService } from '../app-services/restaurants.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-restaurant-owner-panel',
  templateUrl: './restaurant-owner-panel.component.html',
  styleUrls: ['./restaurant-owner-panel.component.css', '../app.component.css']
})
export class RestaurantOwnerPanelComponent implements OnInit {
  restaurant: Restaurant = new Restaurant('', 0, 0, 0, 0, false, '', '', []);
  orders: Order[] = [];
  ordersValue: number = 0;

  constructor(private ownersService: RestaurantOwnersService, private restaurantsService: RestaurantsService,
    private ordersService: OrdersService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (!this.ownersService.isOwnerMode) this.router.navigate(['/home']);

    this.restaurantsService.getRestaurantById(this.ownersService.restaurantOwner.id).subscribe(
      restaurant => {
        if (restaurant !== null) this.restaurant = restaurant;

        this.ordersService.loadOrders().subscribe(orders => {
          this.orders = this.ordersService.getRestaurantOrders(this.restaurant);
          this.ordersValue = this.ordersService.countOrdersValue(this.orders);
        })
      }
    );
  }

  onChangeOrderState(order: Order) {
    this.ordersService.changeOrderState(order);
    this.ordersService.storeOrders();
  }

  onLogout() {
    this.auth.logout();
    this.ownersService.isOwnerMode = false;
  }

}
