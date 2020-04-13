import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, ChangeDetectorRef, ViewContainerRef } from "@angular/core";
import { UIService } from "./shared/services/ui.service";
import { Subscription } from "rxjs";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild(RadSideDrawerComponent, { static: false}) drawerComponent: RadSideDrawerComponent;

    activeChallenges: Array<string> = new Array<string>();
    drawerSubscription :Subscription;

    constructor(private uiService: UIService,
                private changeDetectionRef: ChangeDetectorRef,
                private vcRef: ViewContainerRef){}

    passChallenge(challenge: string){
        this.activeChallenges.push(challenge);
    }

    ngOnInit() {
        this.uiService.rootVCRef = this.vcRef;

    }

    ngAfterViewInit() {
        this.drawerSubscription = this.uiService.drawerState.subscribe(()=> {
            console.log("Drawer toggled!");
            this.drawerComponent.sideDrawer.toggleDrawerState();
        });

        this.changeDetectionRef.detectChanges();
    }

    ngOnDestroy(): void {
        if (this.drawerSubscription) {
            this.drawerSubscription.unsubscribe();
        }
    }

    onLogout(){
        this.uiService.setToggleDrawer();
    }
 }
