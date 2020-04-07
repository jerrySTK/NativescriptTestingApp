import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular';
import { dateProperty } from 'tns-core-modules/ui/date-picker/date-picker';

@Component({
  selector: 'ns-day-modal',
  templateUrl: './day-modal.component.html',
  styleUrls: ['./day-modal.component.css']
})
export class DayModalComponent implements OnInit {
   params: {date: Date};
  constructor(private modalParams: ModalDialogParams) { }

  ngOnInit() {
      this.params = this.modalParams.context as {date: Date};

      console.log(this.params.date);
  }

  onCompleted(status: string) {
    this.modalParams.closeCallback(status);
  }

}
