import { Component, OnInit } from '@angular/core';
import { Challenge } from '../models/challenge';
import { ChallengesService } from '../challenges.service';
import { Observable } from 'rxjs';
import { DayStatus, IDay } from '../models/day.interface';
import { take } from 'rxjs/operators';


@Component({
  selector: 'ns-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {

  currentChallenge$: Observable<Challenge>;

  constructor(private challengesService: ChallengesService) {
    this.currentChallenge$ = this.challengesService.fetchCurrentChallenge();
  }

  ngOnInit() {

  }

  onHandledInput(status: DayStatus) {
      console.log(status);
    this.currentChallenge$.pipe(take(1)).subscribe(c=> {
        this.challengesService.updateDay(c.currentDay.dayInMonth,status);
    });
  }

}
