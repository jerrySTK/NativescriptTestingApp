import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, ChangeDetectorRef, ViewContainerRef } from "@angular/core";
import { UIService } from "./shared/services/ui.service";
import { Subscription } from "rxjs";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";

import * as firebase from "nativescript-plugin-firebase";
import { AuthService } from "./auth/auth.service";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild(RadSideDrawerComponent, { static: false }) drawerComponent: RadSideDrawerComponent;

    activeChallenges: Array<string> = new Array<string>();
    drawerSubscription: Subscription;

    constructor(private uiService: UIService,
        private changeDetectionRef: ChangeDetectorRef,
        private vcRef: ViewContainerRef,
        private authService: AuthService) {
            firebase.init({
                // Optionally pass in properties for database, authentication and cloud messaging,
                // see their respective docs.
            }).then(
                () => {
                    console.log("firebase.init done");
                },
                error => {
                    console.log(`firebase.init error`);
                }
            );

    }

    passChallenge(challenge: string) {
        this.activeChallenges.push(challenge);
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.drawerSubscription = this.uiService.drawerState.subscribe(() => {
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

    onLogout() {
        this.uiService.setToggleDrawer();
        this.authService.logout();
    }
}
