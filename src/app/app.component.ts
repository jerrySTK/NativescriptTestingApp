import { Component } from "@angular/core";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent {
    activeChallenges: Array<string> = new Array<string>();

    passChallenge(challenge: string){
        this.activeChallenges.push(challenge);
    }
 }
