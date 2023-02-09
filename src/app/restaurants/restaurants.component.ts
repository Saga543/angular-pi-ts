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
  restaurants: Restaurant[] = [];
  loading: boolean = true;

  categoriesNames: string[] = [];
  categoriesForm: FormGroup = new FormGroup({});


  constructor(private restaurantsService: RestaurantsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        const enteredLocation: string = params['location'];


        this.restaurantsService.getRestaurants(enteredLocation).subscribe(
          restaurants => {
            this.restaurants = this.restaurantsService.restaurants;
            this.categoriesNames = this.restaurantsService.getCategories();

            for (const category of this.categoriesNames) {
              this.categoriesForm.addControl(category, new FormControl(false));
            }

            this.loading = false;
          });
      });

    this.categoriesForm.valueChanges.subscribe(
      (values) => {
        const checkedCategories = Object.keys(values).filter(key => values[key] === true);

        if (checkedCategories.length > 0) {
          this.restaurants = this.restaurantsService.restaurants.filter(restaurant =>
            checkedCategories.includes(restaurant.category));
        } else { this.restaurants = this.restaurantsService.restaurants }

      });


  }

}
