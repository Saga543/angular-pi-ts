import { Dish } from "./dish.model";
import { Restaurant } from "./restaurant.model";

export class Order {
    constructor(
        public restaurant: Restaurant,
        public dishes: Dish[],
        public price: number,
    ) { }
}