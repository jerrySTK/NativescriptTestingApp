import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular';
import { Page } from 'tns-core-modules/ui/page/page';
import * as application from "tns-core-modules/application";
@Component({
    selector: 'ns-challenge-tabs',
    templateUrl: './challenge-tabs.component.html',
    styleUrls: ['./challenge-tabs.component.common.css',
        './challenge-tabs.component.css']
})
export class ChallengeTabsComponent implements OnInit {

    constructor(private router: RouterExtensions,
        private active: ActivatedRoute,
        private page: Page) {

    }


    ngOnInit() {

        this.router.navigate([{
            outlets: {
                today: ['today'],
                current: ['current-challenge']
            }
        }], {
            relativeTo: this.active
        });
        this.page.actionBarHidden = true;
        this.registerEvents();
    }

    private registerEvents() {
        application.on(application.resumeEvent, (args) => {
            console.log("NS : resumeEvent");
            this.router.navigate([{
                outlets: {
                    today: ['today'],
                    current: ['current-challenge']
                }
            }], {
                relativeTo: this.active
            });
        });
    }

}
