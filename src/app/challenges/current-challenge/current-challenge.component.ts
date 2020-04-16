import { Component, Input, ViewContainerRef, OnInit, OnDestroy } from "@angular/core";
import { RouterExtensions, ModalDialogService } from "nativescript-angular";
import { DayModalComponent } from "../day-modal/day-modal.component";
import { UIService } from "~/app/shared/services/ui.service";
import { ChallengesService } from "../challenges.service";
import { IDay, DayStatus } from "../models/day.interface";
import { Challenge } from "../models/challenge";
import { Subscription } from "rxjs";

@Component({
    selector: 'ns-current-challenge',
    templateUrl: './current-challenge.component.html',
    styleUrls: ['./current-challenge.component.scss']
})
export class CurrentChallengeComponent implements OnInit, OnDestroy {

    public weekDays = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    currentChallenge: Challenge = null;
    private challengeSubscription = new Subscription();
    editEnable: boolean = false;

    constructor(private router: RouterExtensions,
        private modelService: ModalDialogService,
        private uiService: UIService,
        private vcRef: ViewContainerRef,
        private challengeService: ChallengesService) {

    }

    ngOnInit() {
        this.challengeSubscription = this.challengeService.currentChallenge.subscribe(c=> {
            if (c != null) {
                this.currentChallenge = c;
                this.editEnable = true;
            }
            else{
                this.editEnable = false;
            }
            console.log('Challenge readed!');
        });
    }

    ngOnDestroy(): void {
        this.challengeSubscription.unsubscribe();
    }

    onEdit() {
        this.router.navigate(['/challenges/edit']), {
            transition: {
                name: 'slideLeft'
            }
        };
    }

    getIsSettable(dayInMonth: number): boolean {
        return (dayInMonth <= new Date().getDate());
    }

    getIsCompleted(day: IDay){
        if (day.status == DayStatus.Completed){
            return true;
        }
        return false;
    }

    getIsFailed(day: IDay){
        if (day.status == DayStatus.Failed){
            return true;
        }
        return false;
    }

    onChangeStatus(date:Date,title:string,status:DayStatus) {

        if (typeof(date) === 'string' ){
            date = new Date(date);
        }

        if (!this.getIsSettable(date.getDate())){
            return;
        }

        this.modelService.showModal(DayModalComponent,
            {
                fullscreen: true,
                viewContainerRef: this.uiService.rootVCRef ? this.uiService.rootVCRef : this.vcRef,
                context: {
                    date: date,
                    title: title,
                    status: status
                }
            }).then((res) => {
                console.log(res);
            });
    }

}
