import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Dish } from '../app-models/dish.model';
import { Restaurant } from '../app-models/restaurant.model';
import { RestaurantOwner } from '../app-models/restaurantOwner.model';
import { RestaurantOwnersService } from '../app-services/restaurantOwners.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../app.component.css']
})
export class HeaderComponent implements OnInit {
  inputedLocation: string = '';
  isAuthenticated: boolean = false;
  displayHomePage: boolean = false;

  constructor(private router: Router, private authService: AuthService, private http: HttpClient, private route: ActivatedRoute,
    private ownerService: RestaurantOwnersService) { }

  ngOnInit(): void {
    if (this.ownerService.isOwnerMode) this.router.navigate(['/konto/panel_restauracji']);

    this.isAuthenticated = this.authService.userAuthenticated;

    if (this.router.url === '/home') this.displayHomePage = true;

  }

  onInputLocation(location: string) {
    this.router.navigate(['/restauracje/' + location]);
  }

  onPost() {
    this.http.post(
      'https://fd-angular-default-rtdb.europe-west1.firebasedatabase.app/restaurants.json',
      new Restaurant('Rzeszów Kebab 2', 5, 45, 10, 30, true, 'kebab', 'rzeszów',
        [new Dish('Kebab 1', 20, 'opis'),
        new Dish('Kebab 2', 25, 'opis'),
        new Dish('Kebab 3', 30, 'opis'),
        new Dish('Kebab 4', 35, 'opis')])
    ).subscribe(responseData => console.log(responseData));
  }

  onGet() {
    this.http.get<Restaurant[]>('https://fd-angular-default-rtdb.europe-west1.firebasedatabase.app/restaurants.json')
      .pipe(map(responseData => {
        const restaurantsArray: Restaurant[] = [];

        console.log(responseData);

        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) restaurantsArray.push({ ...responseData[key] });
        }

        return restaurantsArray;
      }))
      .subscribe(
        restaurants => { console.log(restaurants); }
      );
  }

  onLogout() {
    this.authService.logout();

    let route = this.router.url;
    if (route === '/home') this.router.navigate(['/konto', 'zamówienia']);
    else this.router.navigate(['/home']);
  }

}
