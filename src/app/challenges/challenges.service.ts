import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Challenge } from './models/challenge';
import { DayStatus } from './models/day.interface';
import { HttpClient } from '@angular/common/http';

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

        this.http.put(this.firebaseUrl + 'challenge',challenge).subscribe( response => {
            console.log(response);
        });

        this._currentChallenge.next(challenge);
    }

    edit(title: string, description: string){
        this.currentChallenge.pipe(take(1)).subscribe(c=> {
            this._currentChallenge.next(new Challenge(title,description,c.year,c.month,c.days));
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
        })
    }

    get currentChallenge() {
        return this._currentChallenge.asObservable();
    }


}
