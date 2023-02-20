import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { RestaurantOwner } from "../app-models/restaurantOwner.model";

@Injectable({ providedIn: 'root' })
export class RestaurantOwnersService {
    isOwnerMode: boolean = false;
    restaurantOwner: RestaurantOwner = new RestaurantOwner('', '', '', '');

    constructor(private http: HttpClient) { }

    getOwnerById(userId: string) {
        return this.http.get<RestaurantOwner[]>('https://fd-angular-default-rtdb.europe-west1.firebasedatabase.app/restaurantOwners.json')
            .pipe(
                map(responseData => {
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key) && responseData[key].id === userId) {
                            this.restaurantOwner = responseData[key];
                            this.isOwnerMode = true;

                            return responseData[key];
                        }
                    }

                    return null;
                }));;
    }

}