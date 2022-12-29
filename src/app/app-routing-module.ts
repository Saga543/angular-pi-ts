import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HeaderComponent } from "./header/header.component";
import { RestaurantDetailComponent } from "./restaurants/restaurant-detail/restaurant-detail.component";
import { RestaurantsComponent } from "./restaurants/restaurants.component";

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HeaderComponent },
    { path: 'restauracje/:location', component: RestaurantsComponent },
    { path: 'restauracje/:location/:restaurantName', component: RestaurantDetailComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}