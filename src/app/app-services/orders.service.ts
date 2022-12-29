import { Injectable } from "@angular/core";
import { Dish } from "../app-models/dish.model";
import { Order } from "../app-models/order.model";
import { Restaurant } from "../app-models/restaurant.model";

@Injectable()
export class OrdersService {
    orders: Order[] = [];

    createOrder(restaurant: Restaurant, dishes: Dish[], price: number = 0) {
        let order = new Order(restaurant, dishes, price);
        this.orders.push(order);

        return order;
    }

    deleteOrder(orderToDelete: Order) {
        let resultIndex = this.orders.indexOf(orderToDelete);
        this.orders.splice(resultIndex, 1);
    }

    getOrderFromRestaurant(restaurant: Restaurant): Order {
        let resultOrder = this.orders.find(order => order.restaurant.name === restaurant.name);

        if (resultOrder === undefined) return this.createOrder(restaurant, [], 0);

        return resultOrder;
    }

    addDishToOrder(order: Order, dish: Dish) {
        order.dishes.push(dish);
    }

    increaseDishQuantity(order: Order, dish: Dish) {
        let resultDish = order.dishes.find(arrayDish => arrayDish === dish);

        if (resultDish !== undefined) {
            resultDish.increaceQuantity();
        }
    }

    reduceDishQuantity(order: Order, dish: Dish) {
        let resultDish = order.dishes.find(arrayDish => arrayDish === dish);

        if (resultDish !== undefined) {
            resultDish.reduceQuantity();
        }
    }

    deleteDishFromOrder(order: Order, dish: Dish) {
        let index: number = order.dishes.indexOf(dish);

        order.dishes[index].setDefaultQuantity();
        order.dishes.splice(index, 1);
    }

    countOrderPrice(order: Order): number {
        let orderPrice: number = 0;

        for (let dish of order.dishes) {
            orderPrice = orderPrice + (dish.price * dish.quantity);
        }
        return orderPrice;
    }
}