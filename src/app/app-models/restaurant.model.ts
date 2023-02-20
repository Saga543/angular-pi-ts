import { Dish } from "./dish.model";

export class Restaurant {
    constructor(
        public name: string,
        public rate: number,
        public deliveryTime: number,
        public deliveryCost: number,
        public minOrderValue: number,
        public opened: boolean,
        public category: string,
        public location: string,
        public dishes: Dish[],

        public ownerId?: string,
    ) { }
}