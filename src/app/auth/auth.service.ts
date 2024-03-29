import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Subject, tap, throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new Subject<User>();
    userId: string = '';
    userAuthenticated: boolean = false;

    constructor(private http: HttpClient) {
        this.user.subscribe(user => {
            this.userAuthenticated = !!user;
            this.userId = user.id;
        });

    }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD4UHbJZ40zKM83_oNo4OCOk1PucmkjI5E',
            {
                email: email,
                password: password,
                returnSecureToken: true,
            })
            .pipe(catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(resData.email, resData.localId, resData.idToken);
                }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD4UHbJZ40zKM83_oNo4OCOk1PucmkjI5E',
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(resData.email, resData.localId, resData.idToken);
                })
            );
    }

    logout() {
        const user = new User('', '', '');

        this.user.next(user);
        this.userAuthenticated = false;
    }

    private handleAuthentication(email: string, userId: string, token: string) {
        const user = new User(email, userId, token);

        this.user.next(user);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!'

        if (!errorRes.error || !errorRes.error.error) return throwError(errorMessage);

        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exists';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct';
                break;
        }
        return throwError(errorMessage);
    }

}