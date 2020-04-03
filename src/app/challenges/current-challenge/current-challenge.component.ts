import { Component, Input } from "@angular/core";
import { ItemEventData } from 'tns-core-modules/ui/list-view/';

@Component({
    selector: 'ns-current-challenge',
    templateUrl: './current-challenge.component.html',
    styleUrls: ['./current-challenge.component.css']
})
export class CurrentChallengeComponent {
    @Input() currentChallenges: Array<string> = new Array<string>();

    onTapItem(args: ItemEventData){
        console.log(args);
    }
}
