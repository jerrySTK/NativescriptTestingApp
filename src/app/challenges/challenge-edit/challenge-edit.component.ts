import { Component, OnInit } from "@angular/core";
import { RouterExtensions, PageRoute } from "nativescript-angular";
import { ActivatedRoute, Params, ParamMap } from "@angular/router";
import { ChallengesService } from "../challenges.service";
import { borderTopRightRadiusProperty } from "tns-core-modules/ui/page/page";
import { Challenge } from "../models/challenge";

@Component({
    selector: 'ns-challenge-edit',
    templateUrl: './challenge-edit.component.html',
    styleUrls: ['./challenge-edit.component.scss']
})
export class ChallengeEditComponent implements OnInit {

    mode: string = "";
    isCreating: boolean = true;
    challenge: { title: string, description: string } = { title: '', description: '' };

    constructor(private activatedRoute: ActivatedRoute,
        private pageRoute: PageRoute,
        private router: RouterExtensions,
        private challengesService: ChallengesService) {

    }

    onSubmit() {
        if (this.isCreating) {
            this.challengesService.create(this.challenge.title, this.challenge.description);
        }
        else {
            this.challengesService.edit(this.challenge.title, this.challenge.description);
        }
        this.router.back();
    }

    ngOnInit() {


        this.pageRoute.activatedRoute.subscribe((route) => {
            route.paramMap.subscribe((params: ParamMap) => {
                if (!params.has('mode')) {
                    this.isCreating = true;
                }
                else {
                    this.isCreating = params.get('mode') !== 'edit';

                    if (!this.isCreating) {
                        this.getCurrentChallengeInfo();
                    }
                }
            });
        });
    }

    getCurrentChallengeInfo() {
        this.challengesService.currentChallenge.subscribe(c => {
            this.challenge.title = c.title;
            this.challenge.description = c.description;
        })
    }
}
