import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Dish } from '../app-models/dish.model';
import { Restaurant } from '../app-models/restaurant.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../app.component.css']
})
export class HeaderComponent implements OnInit {
  inputedLocation: string = '';
  isAuthenticated: boolean = false;

  constructor(private router: Router, private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.userAuthenticated;
  }


  onInputLocation(location: string) {
    this.router.navigate(['/restauracje/' + location]);
  }

  onPost() {
    this.http.post(
      'https://fd-angular-default-rtdb.europe-west1.firebasedatabase.app/restaurants.json',
      new Restaurant('Kraków Burger', 3, 60, 10, 30, true, 'burger', 'kraków', [
        new Dish('Burger 1', 25, 'opis...'),
        new Dish('Burger 2', 25, 'opis...'),
        new Dish('Burger 3', 25, 'opis...'),
      ])
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

}
