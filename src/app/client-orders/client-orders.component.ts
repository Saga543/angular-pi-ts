import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../app-models/order.model';
import { OrdersService } from '../app-services/orders.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.css', '../app.component.css']
})
export class ClientOrdersComponent implements OnInit {
  orders: Order[] = [];
  loading: boolean = false;

  constructor(private ordersService: OrdersService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (!this.auth.userAuthenticated) this.router.navigate(['/home']);
    this.loading = true;

    this.ordersService.getClientOrders().subscribe(
      orders => {
        this.orders = orders;

        this.loading = false;
      }
    );
  }

}
