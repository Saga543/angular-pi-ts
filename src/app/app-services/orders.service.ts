import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Order } from "../app-models/order.model";
import { Restaurant } from "../app-models/restaurant.model";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: 'root' })
export class OrdersService {
    orders: Order[] = [];

    constructor(private http: HttpClient, private auth: AuthService) { }

    addOrder(order: Order) {
        this.orders.push(order);
    }

    deleteOrder(orderToDelete: Order) {
        let resultIndex = this.orders.indexOf(orderToDelete);
        this.orders.splice(resultIndex, 1);
    }

    changeOrderState(order: Order) {
        switch (order.state) {
            case 'złożone': {
                order.state = 'w realizacji';
                console.log(order.state)
                break;
            }
            case 'w realizacji': {
                order.state = 'wysłane';
                console.log(order.state)
                break;
            }
        }
    }

    getOrder(restaurant: Restaurant): Order {
        let resultOrder = this.orders.find(order => order.restaurant.name === restaurant.name);

        if (resultOrder === undefined) return new Order(restaurant, [], 0);

        return resultOrder;
    }

    getRestaurantOrders(restaurant: Restaurant) {
        let resultArray: Order[] = [];

        for (let order of this.orders) {
            if (order.restaurant.name == restaurant.name) resultArray.push(order);
        }
        return resultArray;
    }

    isOrderInList(order: Order) {
        let resultIndex = this.orders.indexOf(order);

        if (resultIndex === -1) return false;

        return true;
    }

    countOrdersValue(orders: Order[]) {
        let result = 0;

        for (let order of orders) {
            result = result + order.price;
        }
        return result;
    }

    sendOrder(order: Order) {
        this.http.post(
            'https://fd-angular-default-rtdb.europe-west1.firebasedatabase.app/orders.json', order)
            .subscribe();
    }

    getClientOrders() {
        return this.http.get<Order[]>('https://fd-angular-default-rtdb.europe-west1.firebasedatabase.app/orders.json')
            .pipe(
                map(responseData => {
                    const ordersArray: Order[] = [];

                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key) && responseData[key].userId === this.auth.userId) {
                            ordersArray.push(responseData[key]);
                        }
                    }

                    return ordersArray;
                }));;
    }

    loadOrders() {
        return this.http.get<Order[]>('https://fd-angular-default-rtdb.europe-west1.firebasedatabase.app/orders.json')
            .pipe(
                map(responseData => {
                    const ordersArray: Order[] = [];

                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            ordersArray.push(responseData[key]);
                        }
                    }

                    this.orders = ordersArray;
                }));;
    }

    storeOrders() {
        this.http.put(
            'https://fd-angular-default-rtdb.europe-west1.firebasedatabase.app/orders.json', this.orders)
            .subscribe();
    }

}