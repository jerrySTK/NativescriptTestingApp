import { Component, Input, ViewContainerRef } from "@angular/core";
import { RouterExtensions, ModalDialogService } from "nativescript-angular";
import { DayModalComponent } from "../day-modal/day-modal.component";
import { UIService } from "~/app/shared/services/ui.service";

@Component({
    selector: 'ns-current-challenge',
    templateUrl: './current-challenge.component.html',
    styleUrls: ['./current-challenge.component.css']
})
export class CurrentChallengeComponent {
    constructor(private router: RouterExtensions,
        private modelService: ModalDialogService,
        private uiService: UIService,
        private vcRef: ViewContainerRef) {

    }

    onEdit() {
        this.router.navigate(['/challenges/edit']), {
            transition: {
                name: 'slideLeft'
            }
        };
    }

    onChageStatus() {
        this.modelService.showModal(DayModalComponent,
            {
                fullscreen: true,
                viewContainerRef: this.uiService.rootVCRef ? this.uiService.rootVCRef : this.vcRef,
                context: {
                    date: new Date()
                }
            }).then((res)=>{
                console.log(res);
            });
    }

}
