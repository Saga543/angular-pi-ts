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

    getOrder(restaurant: Restaurant): Order {
        let resultOrder = this.orders.find(order => order.restaurant.name === restaurant.name);

        if (resultOrder === undefined) return new Order(restaurant, [], 0);

        return resultOrder;
    }

    isOrderInList(order: Order) {
        let resultIndex = this.orders.indexOf(order);

        if (resultIndex === -1) return false;

        return true;
    }

    sendOrder(order: Order) {
        this.http.post(
            'https://fd-angular-default-rtdb.europe-west1.firebasedatabase.app/orders.json', order)
            .subscribe();
    }

    getOrders() {
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

}