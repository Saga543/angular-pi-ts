import { ContactDetails } from "./contactDetails.model";
import { Dish } from "./dish.model";
import { OrderDish } from "./orderDish.model";
import { Restaurant } from "./restaurant.model";

export class Order {
    constructor(
        public restaurant: Restaurant,
        public dishes: OrderDish[],
        public price: number = 0,
        public contactDetails?: ContactDetails,
    ) { }

    isDishInOrder(dish: Dish) {
        const result = this.dishes.find(orderDish => orderDish.dish.name === dish.name);

        if (result !== undefined) return true;

        return false;
    }

    addDish(dish: Dish) {
        let orderDish = new OrderDish(dish);
        this.dishes.push(orderDish);
    }

    deleteDish(dish: Dish) {
        const resultOrderDish = this.dishes.find(orderDish => orderDish.dish === dish);

        if (resultOrderDish !== undefined) {
            const resultIndex = this.dishes.indexOf(resultOrderDish);
            this.dishes.splice(resultIndex, 1);
        }
    }

    increaseDishQuantity(dish: Dish) {
        const resultOrderDish = this.dishes.find(orderDish => orderDish.dish === dish);

        if (resultOrderDish !== undefined) resultOrderDish.increaceQuantity();
    }

    reduceDishQuantity(dish: Dish) {
        const resultOrderDish = this.dishes.find(orderDish => orderDish.dish === dish);

        if (resultOrderDish !== undefined) resultOrderDish.reduceQuantity();
    }

    countOrderValue() {
        let orderPrice: number = 0;

        for (let orderDish of this.dishes) {
            orderPrice = orderPrice + (orderDish.dish.price * orderDish.quantity);
        }
        this.price = orderPrice;
    }
}