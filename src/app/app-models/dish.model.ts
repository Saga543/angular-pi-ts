export class Dish {
    constructor(
        public name: string,
        public price: number,
        public description: string,
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