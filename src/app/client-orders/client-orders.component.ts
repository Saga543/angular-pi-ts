import { Component, OnInit } from '@angular/core';
import { Order } from '../app-models/order.model';
import { OrdersService } from '../app-services/orders.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.css', '../app.component.css']
})
export class ClientOrdersComponent implements OnInit {
  orders: Order[] = [];
  loading: boolean = false;

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.loading = true;

    this.ordersService.getOrders().subscribe(
      orders => {
        this.orders = orders;

        this.loading = false;
      }
    );
  }

}
