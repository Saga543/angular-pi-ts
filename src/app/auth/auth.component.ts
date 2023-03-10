import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { RestaurantOwnersService } from "../app-services/restaurantOwners.service";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css', '../app.component.css'],
})
export class AuthComponent {
    loginMode: boolean = true;
    isLoading: boolean = false;
    error: string | null = null;

    constructor(private authService: AuthService, private router: Router, private ownersService: RestaurantOwnersService) { }

    onSwitch() {
        this.loginMode = !this.loginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) return;

        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;

        if (this.loginMode) {
            authObs = this.authService.login(email, password);
        } else {
            authObs = this.authService.signup(email, password);
        }

        authObs.subscribe(
            resData => {
                this.isLoading = false;

                this.ownersService.getOwnerById(this.authService.userId).subscribe(isOwner => {
                    if (isOwner !== null) this.router.navigate(['/konto/panel_restauracji']);
                    else this.router.navigate(['/home']);
                });

            },
            errorMessage => {
                this.error = errorMessage;
                this.isLoading = false;
            }
        );

        form.reset();
    }

}