import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Status from '../models/day.interface';
import { createSkipSelf } from '@angular/compiler/src/core';

@Component({
    selector: 'ns-edit-challenge-status',
    templateUrl: './edit-challenge-status.component.html',
    styleUrls: ['./edit-challenge-status.component.scss']
})
export class EditChallengeStatusComponent implements OnInit, OnChanges {
    @Output() actionSelected: EventEmitter<Status.DayStatus> = new EventEmitter<Status.DayStatus>();
    @Input() cancelText: string = 'Cancel';

    private statuses = Status.DayStatus;
    @Input() selectedAction: Status.DayStatus = null;
    private _friendlyStatus: String = '';

    constructor() { }


    ngOnChanges(changes: SimpleChanges): void {
        if (changes.selectedAction) {
            this.selectedAction = changes.selectedAction.currentValue;
        }
    }

    friendlyStatus() {
        switch (this.selectedAction) {
            case Status.DayStatus.Completed:
                this._friendlyStatus = 'Completed';
                break;
            case Status.DayStatus.Failed:
                this._friendlyStatus = 'Failed';
                break;
            case Status.DayStatus.Cancel:
                this._friendlyStatus = 'Cancel';
                break;
            default:
                this._friendlyStatus = '';
        }
    }

    ngOnInit() {

    }

    onAction(action: Status.DayStatus) {

        if (this.cancelText !== 'Cancel' && action === Status.DayStatus.Cancel){
            this.selectedAction = Status.DayStatus.Reset;
        }
        else {
            this.selectedAction = action;
        }


        this.actionSelected.next(action);
    }

}
