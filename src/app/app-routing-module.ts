import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { ClientOrdersComponent } from "./client-orders/client-orders.component";
import { ContactDetailsComponent } from "./contact-details/contact-details.component";

import { HeaderComponent } from "./header/header.component";
import { RestaurantDetailComponent } from "./restaurants/restaurant-detail/restaurant-detail.component";
import { RestaurantsComponent } from "./restaurants/restaurants.component";

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HeaderComponent },
    { path: 'restauracje/:location', component: RestaurantsComponent },
    { path: 'restauracje/:location/:restaurantName', component: RestaurantDetailComponent },
    { path: 'restauracje/:location/:restaurantName/dane_kontaktowe', component: ContactDetailsComponent },
    { path: 'konto', component: AuthComponent },
    { path: 'konto/zamówienia', component: ClientOrdersComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}