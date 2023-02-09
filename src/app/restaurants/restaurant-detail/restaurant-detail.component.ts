import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Dish } from 'src/app/app-models/dish.model';
import { Order } from 'src/app/app-models/order.model';
import { OrdersService } from 'src/app/app-services/orders.service';
import { RestaurantsService } from 'src/app/app-services/restaurants.service';
import { Restaurant } from '../../app-models/restaurant.model';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css', '../../app.component.css']
})
export class RestaurantDetailComponent implements OnInit, OnDestroy {
  restaurant: Restaurant;
  order: Order;

  constructor(private restaurantsService: RestaurantsService, private ordersService: OrdersService,
    private route: ActivatedRoute, private router: Router) {
    this.restaurant = new Restaurant('', 0, 0, 0, 0, false, '', '', []);
    this.order = new Order(this.restaurant, [], 0)
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        let restaurantName = params['restaurantName'];
        let restaurantLocation = params['location'];

        // this.restaurant = this.restaurantsService.getRestaurant(restaurantName, restaurantLocation);
        this.order = this.ordersService.getOrderFromRestaurant(this.restaurant);

        if (this.restaurant.name === '') {
          this.router.navigate(['/home']);
        }

        console.log('orders service: ', this.ordersService.orders)
      }
    );
  }

  ngOnDestroy(): void {
    if (this.order.dishes.length === 0) this.ordersService.deleteOrder(this.order);
    console.log('orders service: ', this.ordersService.orders)
  }

  onAddDish(dish: Dish) {
    this.ordersService.addDishToOrder(this.order, dish);
    this.order.price = this.ordersService.countOrderPrice(this.order);
    console.log('orders service: ', this.ordersService.orders)
  }

  onDeleteDish(dish: Dish) {
    this.ordersService.deleteDishFromOrder(this.order, dish);
    this.order.price = this.ordersService.countOrderPrice(this.order);
    console.log('orders service: ', this.ordersService.orders)
  }

  onIncreaseQuantity(dish: Dish) {
    this.ordersService.increaseDishQuantity(this.order, dish);
    this.order.price = this.ordersService.countOrderPrice(this.order);
    console.log('orders service: ', this.ordersService.orders)
  }

  onReduceQuantity(dish: Dish) {
    this.ordersService.reduceDishQuantity(this.order, dish);
    this.order.price = this.ordersService.countOrderPrice(this.order);
    console.log('orders service: ', this.ordersService.orders)
  }

  goToContactDetails() {
    this.router.navigate(['restauracje/', this.restaurant.location, this.restaurant.name, 'dane_kontaktowe']);
  }

}
