import { Component, Input, ViewContainerRef, OnInit } from "@angular/core";
import { RouterExtensions, ModalDialogService } from "nativescript-angular";
import { DayModalComponent } from "../day-modal/day-modal.component";
import { UIService } from "~/app/shared/services/ui.service";

@Component({
    selector: 'ns-current-challenge',
    templateUrl: './current-challenge.component.html',
    styleUrls: ['./current-challenge.component.scss']
})
export class CurrentChallengeComponent implements OnInit {

    public weekDays = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days: { dayInMonth: number,
            dayInWeek,
            rowPos: number,
            cdate: Date }[] = [];

    constructor(private router: RouterExtensions,
        private modelService: ModalDialogService,
        private uiService: UIService,
        private vcRef: ViewContainerRef) {

    }

    ngOnInit() {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        let currentRow = 1;

        for (let i = 1; i < daysInMonth + 1; i++) {
            const date = new Date(currentYear, currentMonth, i);
            const dayInWeek = date.getDay();
            this.days.push({
                dayInMonth: i,
                dayInWeek: dayInWeek,
                rowPos: currentRow,
                cdate: date
            });

            if (dayInWeek == 6){
                currentRow ++;
            }
        }
    }



    onEdit() {
        this.router.navigate(['/challenges/edit']), {
            transition: {
                name: 'slideLeft'
            }
        };
    }

    onChageStatus(date:Date) {
        this.modelService.showModal(DayModalComponent,
            {
                fullscreen: true,
                viewContainerRef: this.uiService.rootVCRef ? this.uiService.rootVCRef : this.vcRef,
                context: {
                    date: date
                }
            }).then((res) => {
                console.log(res);
            });
    }

}
