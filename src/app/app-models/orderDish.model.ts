import { Dish } from "./dish.model";

export class OrderDish {
    constructor(
        public dish: Dish,
        public quantity: number = 1,
    ) { }

    increaceQuantity() {
        this.quantity++;
    }

    reduceQuantity() {
        if (this.quantity > 1) this.quantity--;
    }

    setDefaultQuantity() {
        this.quantity = 1;
    }
}