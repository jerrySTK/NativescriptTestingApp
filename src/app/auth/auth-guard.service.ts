import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RouterExtensions } from 'nativescript-angular';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanLoad {

    constructor(private authService:AuthService, private router:RouterExtensions) { }

    canLoad(route: import("@angular/router").Route,
            segments: import("@angular/router").UrlSegment[]): boolean | import("rxjs").Observable<boolean> | Promise<boolean> {
        return this.authService.user.pipe(
            take(1),
            switchMap(user=> {
                if (!user || user.token){
                    return this.authService.autoLogin();
                }
                return of(true);
            }),
            tap(isAuth=> {
                if (!isAuth){
                    this.router.navigate(['/auth']);
                }
            })
        );
    }
}
