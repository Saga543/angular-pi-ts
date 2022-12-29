import { Injectable } from "@angular/core";
import { Dish } from "../app-models/dish.model";
import { Restaurant } from "../app-models/restaurant.model";

@Injectable()
export class RestaurantsService {

    restaurantsList: Restaurant[] = [
        new Restaurant('Rzeszów Pizza', 3, 60, 10, 30, true, 'pizza', 'rzeszów', [
            new Dish('Pizza Rzeszów 1', 25, 'opis...'),
            new Dish('Pizza Rzeszów 2', 25, 'opis...'),
            new Dish('Pizza Rzeszów 3', 25, 'opis...'),
        ]),
        new Restaurant('Rzeszów Kebab', 2, 60, 10, 30, true, 'kebab', 'rzeszów', [
            new Dish('Kebab Rzeszów 1', 25, 'opis...'),
            new Dish('Kebab Rzeszów 2', 25, 'opis...'),
            new Dish('Kebab Rzeszów 3', 25, 'opis...'),
        ]),

        new Restaurant('Kraków Pizza', 4, 60, 10, 30, true, 'pizza', 'kraków', [
            new Dish('Pizza Kraków 1', 25, 'opis...'),
            new Dish('Pizza Kraków 2', 25, 'opis...'),
            new Dish('Pizza Kraków 3', 25, 'opis...'),
        ]),
        new Restaurant('Kraków Kebab', 2, 60, 10, 30, true, 'kebab', 'kraków', [
            new Dish('Kebab Kraków 1', 25, 'opis...'),
            new Dish('Kebab Kraków 2', 25, 'opis...'),
            new Dish('Kebab Kraków 3', 25, 'opis...'),
        ]),
        new Restaurant('Kraków Burger', 3, 60, 10, 30, false, 'burger', 'kraków', [
            new Dish('Burger Kraków 1', 25, 'opis...'),
            new Dish('Burger Kraków 2', 25, 'opis...'),
            new Dish('Burger Kraków 3', 25, 'opis...'),
        ]),
    ];

    getRestaurants(location: string, categories: string[] = []) {
        let resultArray: Restaurant[] = [];

        location = location.toLowerCase();

        for (let restaurant of this.restaurantsList) {
            if (categories.length > 0) {
                if ((restaurant.location === location) && (categories.includes(restaurant.category))) {
                    resultArray.push(restaurant);
                }
            } else {
                if (restaurant.location === location) {
                    resultArray.push(restaurant);
                }
            }
        }
        resultArray.sort((a, b) => b.rate - a.rate)

        return resultArray;
    }

    getCategoriesFromLocation(location: string) {
        let resultArray: string[] = [];

        location = location.toLowerCase();

        for (let restaurant of this.restaurantsList) {
            if ((restaurant.location === location) && (!resultArray.includes(restaurant.category))) {
                resultArray.push(restaurant.category);
            }
        }
        return resultArray;
    }

    getRestaurant(name: string, location: string) {
        for (let restaurant of this.restaurantsList) {
            if ((restaurant.name === name) && (restaurant.location === location)) {
                return restaurant;
            }
        }
        return new Restaurant('', 0, 0, 0, 0, false, '', '', []);
    }
}