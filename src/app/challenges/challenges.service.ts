import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Challenge } from './models/challenge';
import { DayStatus, IDay } from './models/day.interface';
import { HttpClient } from '@angular/common/http';
import * as firebase from "nativescript-plugin-firebase";
@Injectable({
    providedIn: 'root'
})
export class ChallengesService {

    private _currentChallenge = new BehaviorSubject<Challenge>(null);
    private firebaseUrl = 'https://ns-ng-course-91d84.firebaseio.com/';
    constructor(private http: HttpClient) { }

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

    private sendToServer(challenge: Challenge){
        this.http.put(this.firebaseUrl + 'challenge.json',challenge).subscribe( response => {
            console.log(response);
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
        return this.http.get<{title:string,description:string,year:number,month:number,_days:IDay[]}>(this.firebaseUrl + 'challenge.json')
                        .pipe(map(response=> {
                            const c = new Challenge(response.title,response.description,response.year,response.month,response._days);
                            this._currentChallenge.next(c)
                            return c;
                        }));
    }

    get currentChallenge() {
        return this._currentChallenge.asObservable();
    }


}
