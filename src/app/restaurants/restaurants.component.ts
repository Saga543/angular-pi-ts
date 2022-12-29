import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RestaurantsService } from '../app-services/restaurants.service';
import { Restaurant } from '../app-models/restaurant.model';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css', '../app.component.css']
})
export class RestaurantsComponent implements OnInit {
  enteredLocation: string = '';
  restaurants: Restaurant[] = [];

  categoriesNames: string[] = [];
  categoriesForm: FormGroup;


  constructor(private restaurantsService: RestaurantsService, private route: ActivatedRoute) {
    this.categoriesForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.enteredLocation = params['location'];
        this.categoriesNames = this.restaurantsService.getCategoriesFromLocation(this.enteredLocation);
        this.restaurants = this.restaurantsService.getRestaurants(this.enteredLocation);

        for (const category of this.categoriesNames) {
          this.categoriesForm.addControl(category, new FormControl(false));
        }
      }
    );

    this.categoriesForm.valueChanges.subscribe(
      (values) => {
        const checkedCategories = Object.keys(values).filter(key => values[key] === true);

        this.restaurants = this.restaurantsService.getRestaurants(this.enteredLocation, checkedCategories);
      }
    );
  }

}
