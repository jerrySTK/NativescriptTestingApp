import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'ns-challenge-edit',
    templateUrl: './challenge-edit.component.html',
    styleUrls: ['./challenge-edit.component.css']
})
export class ChallengeEditComponent {
    challengeDescription:string = "";
    @Output() input = new EventEmitter<string>();

    onSetChallenge(){
        this.input.emit(this.challengeDescription);
    }
}
