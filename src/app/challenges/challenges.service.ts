import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, throwError, of, Subscription } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';
import { Challenge } from './models/challenge';
import { DayStatus, IDay } from './models/day.interface';
import { HttpClient } from '@angular/common/http';
import * as firebase from "nativescript-plugin-firebase";
import { AuthService } from '../auth/auth.service';
@Injectable({
    providedIn: 'root'
})
export class ChallengesService implements OnDestroy {

    private _currentChallenge = new BehaviorSubject<Challenge>(null);
    private firebaseUrl = 'https://ns-ng-course-91d84.firebaseio.com/';
    private userSubscription: Subscription;

    constructor(private http: HttpClient,
        private authService:AuthService) {

            this.userSubscription = this.authService.user.subscribe(user=> {
                if (!user){
                    this.clearChallenge();
                }
            })
        }
    ngOnDestroy(): void {
        if (this.userSubscription){
            this.userSubscription.unsubscribe();
        }
    }

    create(title: string, description: string) {
        const challenge = new Challenge(title,
            description,
            new Date().getFullYear(),
            new Date().getMonth());
        console.log("Challenge Create!");
        //firebase.push('challenges',challenge);

        this.sendToServer(challenge);
        this._currentChallenge.next(challenge);
    }

    clearChallenge(){
        this._currentChallenge.next(null);
    }

    private sendToServer(challenge: Challenge){
        this.authService.user.pipe(take(1),
            switchMap(user=> {
                if (user && user.isAuth) {
                    return this.http.put(this.firebaseUrl + `challenge/${user.id}.json?auth=` + user.token ,challenge)
                }
                else{
                    return of(null);
                }
            })
        ).subscribe(response=> {
            return console.log(response);
        });
    }

    edit(title: string, description: string){
        this.currentChallenge.pipe(take(1)).subscribe(c=> {
            const ch = new Challenge(title,description,c.year,c.month,c.days);
            this._currentChallenge.next(ch);
            this.sendToServer(ch);
        });
    }

    updateDay(dayInMonth: number, status: DayStatus) {
        this.currentChallenge.pipe(take(1))
        .subscribe(c => {
            if(!c || c.days.length < dayInMonth){
                return;
            }

            let dayToUpdate = c.days.filter(e => e.dayInMonth == dayInMonth)[0];

            if (status == DayStatus.Reset)
                dayToUpdate.status = null;

            dayToUpdate.status = status;


            const ch = new Challenge(c.title, c.description, c.year, c.month, [...c.days]);
            console.log('Updating challenge');
            console.log(ch);
            this._currentChallenge.next(ch);
            this.sendToServer(ch);
        })
    }


    fetchCurrentChallenge(): Observable<Challenge> {
        return this.authService.user.pipe(
            switchMap( user => {
                if (!user || !user.isAuth)
                {
                    return of(null);
                }
                return this.http.get<{title:string,description:string,year:number,month:number,_days:IDay[]}>(this.firebaseUrl + `challenge/${user.id}.json?auth=` + user.token);
            }),
            map(response=> {
                if (!response)
                {
                    return null;
                }
                const c = new Challenge(response.title,response.description,response.year,response.month,response._days);
                this._currentChallenge.next(c);
                return c;
            })
        );
    }

    get currentChallenge() {
        return this._currentChallenge.asObservable();
    }


}
