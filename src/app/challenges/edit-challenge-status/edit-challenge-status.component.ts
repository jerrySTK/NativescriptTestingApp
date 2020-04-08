import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'ns-edit-challenge-status',
  templateUrl: './edit-challenge-status.component.html',
  styleUrls: ['./edit-challenge-status.component.scss']
})
export class EditChallengeStatusComponent implements OnInit {
  @Output() actionSelected: EventEmitter<string> =  new EventEmitter<string>();
  @Input() cancelText: string = 'Cancel';

  constructor() { }

  ngOnInit() {
  }

  onAction(action: string){
    this.actionSelected.next(action);
  }

}
