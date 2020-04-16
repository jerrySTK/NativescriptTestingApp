import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { alert } from 'tns-core-modules/ui/dialogs';
import { User } from './user.model';
import { AuthResponse, AuthLoginResponse } from './auth-reponse.model';
import { RouterExtensions } from 'nativescript-angular';
import { setString, getString, hasKey, remove } from 'tns-core-modules/application-settings';
import { ChallengesService } from '../challenges/challenges.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    apiKey = 'AIzaSyA_sDQcSfOS8-pDTBWYtLSLfuW0_mPz3Wo';
    signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
    logInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;
    private _user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: number;

    constructor(private http: HttpClient,
                private router: RouterExtensions) { }

    get user() {
        return this._user.asObservable();
    }

    logout() {
        this._user.next(null);
        remove('userData');

        if (this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }



        this.router.navigate(['/auth'], { clearHistory: true });
    }

    signUp(user: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(this.signUpUrl,
            { email: user, password: password, returnSecureToken: true })
            .pipe(tap(response => {
                var usr = this.createUser(response);
                if (usr){
                    this.autoLogout(usr.timeToExpiry);
                }

            }),
                catchError(this.handleError)
            );
    }

    logIn(user: string, password: string):
        Observable<AuthLoginResponse> {
        return this.http.post<AuthLoginResponse>
            (this.logInUrl, {
                email: user,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.handleError),
                tap(response => {
                    var usr = this.createUser(response);
                    if (usr){
                        this.autoLogout(usr.timeToExpiry);
                    }
                })
            );
    }

    autoLogin(): Observable<boolean> {
        if (!hasKey('userData')) {
            return of(false);
        }

        const authData: AuthResponse = JSON.parse(getString('userData'));
        const expr = new Date(new Date().getTime() + parseInt(authData.expiresIn) * 1000);
        const usr = new User(authData.email, authData.localId, authData.idToken, expr);

        if (usr.isAuth) {
            this._user.next(usr);
            this.autoLogout(usr.timeToExpiry);
            return of(true);
        }

        return of(false);
    }

    autoLogout(expireTime: number) {
        //this.tokenExpirationTimer = setTimeout(()=> this.logout,3000);
        var callback = this.logout.bind(this);
        this.tokenExpirationTimer = setTimeout(callback,expireTime);

    }


    private createUser(response: AuthResponse | AuthLoginResponse): User {
        if (response && response.idToken) {
            const expr = new Date(new Date().getTime() + parseInt(response.expiresIn) * 1000);
            let usr = new User(response.email, response.localId, response.idToken, expr);
            setString('userData', JSON.stringify(response));
            this._user.next(usr);
            return usr;
        }
        return null;
    }

    private handleError(e: any) {

        switch (e.error.error.message) {
            case 'EMAIL_EXISTS':
                alert('This email already exists!');
                break;
            case 'INVALID_PASSWORD':
                alert('Invalid password!');
                break;
            default:
                alert('Authentication fail check your credentials!');
                break;
        }

        return throwError({ error: e.error.error.message });
    }
}
