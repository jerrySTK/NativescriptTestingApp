import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular';
import { dateProperty } from 'tns-core-modules/ui/date-picker/date-picker';
import { ChallengesService } from '../challenges.service';
import { DayStatus } from '../models/day.interface';

@Component({
  selector: 'ns-day-modal',
  templateUrl: './day-modal.component.html',
  styleUrls: ['./day-modal.component.css']
})
export class DayModalComponent implements OnInit {
   params: {date: Date, title: string,  status: number};
  constructor(private modalParams: ModalDialogParams,
              private challengesService:ChallengesService) { }

  ngOnInit() {
      this.params = this.modalParams.context as {date: Date, title: string,  status: number};

      console.log(this.params.date);
  }

  onHandledInput(status: DayStatus) {
    console.log(status);
    if (status != DayStatus.Cancel){
        this.challengesService.updateDay(this.params.date.getDate(),status);
    }

    this.modalParams.closeCallback(status);
  }

}
