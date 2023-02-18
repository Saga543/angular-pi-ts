import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ContactDetails } from 'src/app/app-models/contactDetails.model';
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
  restaurant: Restaurant = new Restaurant('', 0, 0, 0, 0, false, '', '', []);
  order: Order = new Order(this.restaurant, [], 0)

  constructor(private restaurantsService: RestaurantsService, private ordersService: OrdersService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        let restaurantName = params['restaurantName'];
        let restaurantLocation = params['location'];

        this.restaurant = this.restaurantsService.getRestaurant(restaurantName, restaurantLocation);
        this.order = this.ordersService.getOrder(this.restaurant);

        if (this.restaurant.name === '') this.router.navigate(['/home']);

      }
    );
  }

  ngOnDestroy(): void {
    if (this.order.dishes.length > 0 && this.restaurant.name !== '' && !this.ordersService.isOrderInList(this.order))
      this.ordersService.addOrder(this.order);

    // console.log('orders on destroy: ', this.ordersService.orders)
  }

  onAddDish(dish: Dish) {
    this.order.addDish(dish);
    this.order.countOrderValue();

    // console.log('dishes: ', this.order.dishes)
  }

  onDeleteDish(dish: Dish) {
    this.order.deleteDish(dish);
    this.order.countOrderValue();

    // console.log('dishes: ', this.order.dishes)
  }

  onIncreaseQuantity(dish: Dish) {
    this.order.increaseDishQuantity(dish);
    this.order.countOrderValue();

    // console.log('orders service: ', this.ordersService.orders)
  }

  onReduceQuantity(dish: Dish) {
    this.order.reduceDishQuantity(dish);
    this.order.countOrderValue();

    // console.log('orders service: ', this.ordersService.orders)
  }

  goToContactDetails() {
    this.router.navigate(['restauracje/', this.restaurant.location, this.restaurant.name, 'dane_kontaktowe']);
  }

}
