import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Restaurant } from "../app-models/restaurant.model";


@Injectable()
export class RestaurantsService {

    restaurants: Restaurant[] = [];

    constructor(private http: HttpClient) { }

    getRestaurants(location: string) {
        return this.http.get<Restaurant[]>('https://fd-angular-default-rtdb.europe-west1.firebasedatabase.app/restaurants.json')
            .pipe(
                map(responseData => {
                    const restaurantsArray: Restaurant[] = [];
                    location = location.toLowerCase();

                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key) && responseData[key].location == location) {
                            restaurantsArray.push(responseData[key]);
                        }
                    }
                    restaurantsArray.sort((a, b) => b.rate - a.rate);

                    this.restaurants = restaurantsArray;
                }));
    }

    getCategories() {
        let resultArray: string[] = [];

        for (let restaurant of this.restaurants) {
            if (!resultArray.includes(restaurant.category)) {
                resultArray.push(restaurant.category);
            }
        }
        return resultArray;
    }


    getRestaurant(name: string, location: string): Restaurant {
        location = location.toLowerCase();

        for (let restaurant of this.restaurants) {
            if ((restaurant.name === name) && (restaurant.location === location)) {
                return restaurant;
            }
        }
        return new Restaurant('', 0, 0, 0, 0, false, '', '', []);
    }
}