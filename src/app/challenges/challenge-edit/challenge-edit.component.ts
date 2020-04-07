import { Component, OnInit } from "@angular/core";
import { RouterExtensions, PageRoute } from "nativescript-angular";
import { ActivatedRoute, Params, ParamMap } from "@angular/router";

@Component({
    selector: 'ns-challenge-edit',
    templateUrl: './challenge-edit.component.html',
    styleUrls: ['./challenge-edit.component.css']
})
export class ChallengeEditComponent implements OnInit {

    mode:string = "";
    isCreating:boolean = true;

    constructor(private activatedRoute: ActivatedRoute,
                private pageRoute: PageRoute) {

    }

    ngOnInit() {
        // this.activatedRoute.paramMap.subscribe((params:ParamMap) => {
        //     this.mode = params.get('mode');
        //     console.log(this.mode);
        // });

        this.pageRoute.activatedRoute.subscribe((route)=> {
            route.paramMap.subscribe((params:ParamMap)=> {
                if (!params.has('mode')){
                    this.isCreating = true;
                }
                else{
                    this.isCreating = params.get('mode') !== 'edit';
                }
            });
        });
    }
}
