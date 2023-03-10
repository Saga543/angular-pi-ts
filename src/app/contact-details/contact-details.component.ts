import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { format } from 'date-fns';
import { ContactDetails } from '../app-models/contactDetails.model';
import { Order } from '../app-models/order.model';
import { Restaurant } from '../app-models/restaurant.model';
import { OrdersService } from '../app-services/orders.service';
import { RestaurantsService } from '../app-services/restaurants.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css', '../app.component.css']
})
export class ContactDetailsComponent implements OnInit {
  restaurant: Restaurant = new Restaurant('', 0, 0, 0, 0, false, '', '', []);
  order: Order = new Order(this.restaurant, [], 0);

  contactDetailsForm: FormGroup = new FormGroup({
    'name': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-ZęóąśłżźćńĘÓĄŚŁŻŹĆŃ]+$')]),
    'surname': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-ZęóąśłżźćńĘÓĄŚŁŻŹĆŃ]+$')]),
    'email': new FormControl(null, Validators.email),
    'phoneNumber': new FormControl(null, [Validators.required, Validators.pattern('[0-9]{9}')]),

    'location': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-ZęóąśłżźćńĘÓĄŚŁŻŹĆŃ]+$')]),
    'street': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-ZęóąśłżźćńĘÓĄŚŁŻŹĆŃ]+$')]),
    'buildingNumber': new FormControl(null, [Validators.required, Validators.pattern('[0-9]+')]),
    'flatNumber': new FormControl(null, Validators.pattern('[0-9]+')),
  });

  constructor(private restaurantsService: RestaurantsService, private ordersService: OrdersService,
    private route: ActivatedRoute, private router: Router, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        let restaurantName = params['restaurantName'];
        let restaurantLocation = params['location'];

        this.restaurant = this.restaurantsService.getRestaurant(restaurantName, restaurantLocation);
        this.order = this.ordersService.getOrder(this.restaurant);

        if (this.restaurant.name === '') {
          this.router.navigate(['/home']);
        }

      }
    );

  }

  onSendOrder() {
    if (this.contactDetailsForm.valid) {
      const contactDetails = new ContactDetails(
        this.contactDetailsForm.get('name')?.value,
        this.contactDetailsForm.get('surname')?.value,
        this.contactDetailsForm.get('phoneNumber')?.value,
        this.contactDetailsForm.get('location')?.value,
        this.contactDetailsForm.get('street')?.value,
        this.contactDetailsForm.get('buildingNumber')?.value,

        this.contactDetailsForm.get('email')?.value,
        this.contactDetailsForm.get('flatNumber')?.value,
      );

      if (this.auth.userAuthenticated) this.order.userId = this.auth.userId;

      this.order.contactDetails = contactDetails;
      this.order.date = format(new Date(), 'dd.MM.yyyy HH:mm');

      this.ordersService.sendOrder(this.order);
      this.ordersService.deleteOrder(this.order);


      alert('Zamówienie zostało wysłane!');
      this.router.navigate(['/home']);
    } else {
      alert('Uzupełnij poprawnie formularz!');
    }
  }

}
